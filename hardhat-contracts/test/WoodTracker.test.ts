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
      expect(await woodTracker.getRole(owner.address)).to.equal(1); // Role.Admin
    });
  });

  describe("Roles", function () {
    it("Should allow the owner to assign an Admin role", async function () {
      await woodTracker.assignRole(admin.address, 1); // Role.Admin
      expect(await woodTracker.getRole(admin.address)).to.equal(1); // Role.Admin
    });

    it("Should prevent non-owner from assigning Admin role", async function () {
      await expect(
        woodTracker.connect(admin).assignRole(admin.address, 1) // Role.Admin
      ).to.be.revertedWith(
        "Error: Only the contract owner can assign or remove the Admin role."
      );
    });

    it("Should allow Admin to assign non-admin roles", async function () {
      await woodTracker.assignRole(admin.address, 1); // Role.Admin
      await woodTracker.connect(admin).assignRole(extractor.address, 2); // Role.Extractor
      expect(await woodTracker.getRole(extractor.address)).to.equal(2); // Role.Extractor
    });

    it("Should prevent assigning 'None' as a role", async function () {
      await woodTracker.assignRole(admin.address, 1); // Role.Admin
      await expect(
        woodTracker.connect(admin).assignRole(other.address, 0) // Role.None
      ).to.be.revertedWith("Error: Cannot assign 'None' as a role.");
    });
  });

  describe("Production Sites", function () {
    const siteName = "Forest A";
    const siteCapacity = 1000;
    const sitePermits = ["Permit1"];
    const siteCertificates = ["Cert1"];
    const latitude = 12345678;
    const longitude = -87654321;

    beforeEach(async function () {
      await woodTracker.assignRole(admin.address, 1); // Role.Admin
    });

    it("Should allow Admin to add a production site", async function () {
      await woodTracker
        .connect(admin)
        .assignRole(extractor.address, 2); // Role.Extractor

      await woodTracker
        .connect(extractor)
        .createProductionSite(
          siteName,
          siteCapacity,
          sitePermits,
          siteCertificates,
          latitude,
          longitude
        );

      const site = await woodTracker.getProductionSite(extractor.address);

      expect(site.name).to.equal(siteName);
      expect(site.capacity).to.equal(siteCapacity);
      expect(site.location.latitude).to.equal(latitude);
      expect(site.location.longitude).to.equal(longitude);
    });

    it("Should prevent non-Extractor from adding a production site", async function () {
      await expect(
        woodTracker
          .connect(other)
          .createProductionSite(
            siteName,
            siteCapacity,
            sitePermits,
            siteCertificates,
            latitude,
            longitude
          )
      ).to.be.revertedWith("Error: Caller is not an extractor.");
    });
  });

  describe("Wood Records", function () {
    const weightInKg = 500;
    const woodType = "Oak";
    const cutType = "Cut A";

    beforeEach(async function () {
      await woodTracker.assignRole(admin.address, 1); // Role.Admin
      await woodTracker.connect(admin).assignRole(extractor.address, 2); // Role.Extractor

      await woodTracker
        .connect(extractor)
        .createProductionSite(
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
        .createWoodRecord(weightInKg, woodType, cutType);

      const record = await woodTracker.getWoodRecord(0); // First record (ID = 0)

      console.log("record: ", record);

      expect(record.id).to.equal(0); // Auto-incremented ID
      expect(record.weightInKg).to.equal(weightInKg);
      expect(record.woodType).to.equal(woodType);
      expect(record.cutType).to.equal(cutType);
      expect(record.state).to.equal(0); // WoodState.Harvested
      expect(record.currentResponsible).to.equal(extractor.address);
      expect(record.productionSite).to.equal(extractor.address);
    });

    it("Should prevent non-Extractor from creating a wood record", async function () {
      await expect(
        woodTracker
          .connect(other)
          .createWoodRecord(weightInKg, woodType, cutType)
      ).to.be.revertedWith("Error: Caller is not an extractor.");
    });

    it("Should allow current responsible to update wood record state", async function () {
      await woodTracker
        .connect(extractor)
        .createWoodRecord(weightInKg, woodType, cutType);

      await woodTracker
        .connect(extractor)
        .updateWoodRecord(0, 1, 600); // Update state to WoodState.Transported

      const record = await woodTracker.getWoodRecord(0);
      expect(record.state).to.equal(1); // WoodState.Transported
      expect(record.weightInKg).to.equal(600);
    });

    it("Should prevent non-responsible party from updating wood record", async function () {
      await woodTracker
        .connect(extractor)
        .createWoodRecord(weightInKg, woodType, cutType);

      await expect(
        woodTracker.connect(other).updateWoodRecord(0, 1, 600)
      ).to.be.revertedWith("Error: Caller is not the current responsible party.");
    });
  });
});
