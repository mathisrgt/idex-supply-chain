import { expect } from "chai";
import { ethers } from "hardhat";
import { WoodTracker } from "../typechain-types";

describe("WoodTracker", function () {
  let woodTracker: WoodTracker;
  let owner: any, admin: any, extractor: any, other: any;

  beforeEach(async function () {
    [owner, admin, extractor, other] = await ethers.getSigners();

    const WoodTrackerFactory = await ethers.getContractFactory("WoodTracker");
    woodTracker = await WoodTrackerFactory.deploy();
    await woodTracker.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should set the correct owner and assign admin role", async function () {
      expect(await woodTracker.owner()).to.equal(owner.address);
      expect(await woodTracker.getRole(owner.address)).to.equal(1);
    });
  });

  describe("Roles", function () {
    it("Should allow the owner to assign an Admin role", async function () {
      await woodTracker.assignAdminRole(admin.address);
      expect(await woodTracker.getRole(admin.address)).to.equal(1);
    });

    it("Should prevent non-owner from assigning Admin role", async function () {
      await expect(
        woodTracker.connect(admin).assignAdminRole(admin.address)
      ).to.be.revertedWith("Error: Caller is not the contract owner.");
    });

    it("Should allow Admin to assign non-admin roles", async function () {
      await woodTracker.assignAdminRole(admin.address);
      await woodTracker.connect(admin).assignRole(extractor.address, 2);
      expect(await woodTracker.getRole(extractor.address)).to.equal(2);
    });

    it("Should prevent assigning 'None' as a role", async function () {
      await woodTracker.assignAdminRole(admin.address);
      await expect(
        woodTracker.connect(admin).assignRole(other.address, 0)
      ).to.be.revertedWith("Error: Cannot assign 'None' as a role.");
    });
  });

  describe("Production Sites", function () {
    const siteAddress = "0x000000000000000000000000000000000000dEaD";
    const siteName = "Forest A";
    const siteCapacity = 1000;
    const sitePermits = ["Permit1"];
    const siteCertificates = ["Cert1"];
    const latitude = 12345678;
    const longitude = -87654321;

    beforeEach(async function () {
      await woodTracker.assignAdminRole(admin.address);
    });

    it("Should allow Admin to add a production site", async function () {
      await woodTracker
        .connect(admin)
        .addProductionSite(
          siteAddress,
          siteName,
          siteCapacity,
          sitePermits,
          siteCertificates,
          latitude,
          longitude
        );

      const site = await woodTracker.getProductionSite(siteAddress);

      expect(site.name).to.equal(siteName);
      expect(site.capacity).to.equal(siteCapacity);
      expect(site.location.latitude).to.equal(latitude);
      expect(site.location.longitude).to.equal(longitude);
    });

    it("Should prevent non-Admin from adding a production site", async function () {
      await expect(
        woodTracker
          .connect(other)
          .addProductionSite(
            siteAddress,
            siteName,
            siteCapacity,
            sitePermits,
            siteCertificates,
            latitude,
            longitude
          )
      ).to.be.revertedWith("Error: Address does not have an assigned role.");
    });
  });

  describe("Wood Records", function () {
    const recordId = 1;
    const origin = "Origin A";
    const weightInKg = 500;
    const woodType = "Oak";
    const cutType = "Cut A";
    const productionSite = "0x000000000000000000000000000000000000dEaD";

    beforeEach(async function () {
      await woodTracker.assignAdminRole(admin.address);
      await woodTracker.connect(admin).assignRole(extractor.address, 2); // Role.Extractor

      await woodTracker
        .connect(admin)
        .addProductionSite(
          productionSite,
          "Forest A",
          1000,
          ["Permit1"],
          ["Cert1"],
          12345678,
          -87654321
        );
    });

    it("Should allow Extractor to create a wood record", async function () {
      await woodTracker
        .connect(extractor)
        .createWoodRecord(
          recordId,
          origin,
          weightInKg,
          woodType,
          cutType,
          productionSite
        );

      const record = await woodTracker.getWoodRecord(recordId);

      expect(record.id).to.equal(recordId);
      expect(record.origin).to.equal(origin);
      expect(record.weightInKg).to.equal(weightInKg);
      expect(record.woodType).to.equal(woodType);
      expect(record.cutType).to.equal(cutType);
      expect(record.state).to.equal(0); // WoodState.Harvested
      expect(record.currentResponsible).to.equal(extractor.address);
      expect(record.productionSite).to.equal(productionSite);
    });

    it("Should prevent non-Extractor from creating a wood record", async function () {
      await expect(
        woodTracker
          .connect(other)
          .createWoodRecord(
            recordId,
            origin,
            weightInKg,
            woodType,
            cutType,
            productionSite
          )
      ).to.be.revertedWith("Error: Address does not have an assigned role.");
    });

    it("Should allow current responsible to update wood record state", async function () {
      await woodTracker
        .connect(extractor)
        .createWoodRecord(
          recordId,
          origin,
          weightInKg,
          woodType,
          cutType,
          productionSite
        );

      await woodTracker
        .connect(extractor)
        .updateWoodRecord(recordId, 1, 600); // WoodState.Transported

      const record = await woodTracker.getWoodRecord(recordId);
      expect(record.state).to.equal(1); // WoodState.Transported
      expect(record.weightInKg).to.equal(600);
    });

    it("Should prevent non-responsible party from updating wood record", async function () {
      await woodTracker
        .connect(extractor)
        .createWoodRecord(
          recordId,
          origin,
          weightInKg,
          woodType,
          cutType,
          productionSite
        );

      expect(
        woodTracker.connect(other).updateWoodRecord(recordId, 1, 600)
      ).to.be.revertedWith("Error: Address does not have an assigned role.");
    });
  });
});
