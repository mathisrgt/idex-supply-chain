// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console2} from "../lib/forge-std/src/Script.sol";
import {Counter} from "../src/Counter.sol";

contract CounterScript is Script {
    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        Counter counter = new Counter();

        console2.log("Contract deployed!");
        console2.log("Deployed Address:", address(counter));
        console2.log("Deployer Address:", tx.origin);

        vm.stopBroadcast();
    }
}
