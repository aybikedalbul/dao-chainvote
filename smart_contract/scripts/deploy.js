const hre = require("hardhat");

async function main() {
    const DAO = await hre.ethers.getContractFactory("DAO");
    const dao = await DAO.deploy();

    console.log("Deploy işlemi başladı...");

    await dao.waitForDeployment(); 

    console.log(`DAO deployed to: ${await dao.getAddress()}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
