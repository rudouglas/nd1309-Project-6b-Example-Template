// This script is designed to test the solidity smart contract - SuppyChain.sol -- and the various functions within
// Declare a variable and assign the compiled smart contract artifact
var SupplyChain = artifacts.require("SupplyChain");

contract("SupplyChain", function (accounts) {
  // Declare few constants and assign a few sample accounts generated by ganache-cli
  var sku = 1;
  var upc = 1;
  const ownerID = accounts[0];
  const originFarmerID = accounts[1];
  const originFarmName = "John Doe";
  const originFarmInformation = "Yarray Valley";
  const originFarmLatitude = "-38.239770";
  const originFarmLongitude = "144.341490";
  var productID = sku + upc;
  const productNotes = "Best potatos for shpuds";
  const deadProductNotes = "Blighted";
  const productPrice = web3.utils.toWei("1", "ether");
  var itemState = 0;
  const distributorID = accounts[2];
  const retailerID = accounts[3];
  const consumerID = accounts[4];
  const emptyAddress = "0x00000000000000000000000000000000000000";

  ///Available Accounts
  ///==================
  ///(0) 0x27d8d15cbc94527cadf5ec14b69519ae23288b95
  ///(1) 0x018c2dabef4904ecbd7118350a0c54dbeae3549a
  ///(2) 0xce5144391b4ab80668965f2cc4f2cc102380ef0a
  ///(3) 0x460c31107dd048e34971e57da2f99f659add4f02
  ///(4) 0xd37b7b8c62be2fdde8daa9816483aebdbd356088
  ///(5) 0x27f184bdc0e7a931b507ddd689d76dba10514bcb
  ///(6) 0xfe0df793060c49edca5ac9c104dd8e3375349978
  ///(7) 0xbd58a85c96cc6727859d853086fe8560bc137632
  ///(8) 0xe07b5ee5f738b2f87f88b99aac9c64ff1e0c7917
  ///(9) 0xbd3ff2e3aded055244d66544c9c059fa0851da44

  console.log("ganache-cli accounts used here...");
  console.log("Contract Owner: accounts[0] ", accounts[0]);
  console.log("Farmer: accounts[1] ", accounts[1]);
  console.log("Distributor: accounts[2] ", accounts[2]);
  console.log("Retailer: accounts[3] ", accounts[3]);
  console.log("Consumer: accounts[4] ", accounts[4]);

  // 1st Test
  it("Testing smart contract function fertiliseItem() that allows a farmer to fertilise a vegetable", async () => {
    const supplyChain = await SupplyChain.deployed();
    await supplyChain.addFarmer(originFarmerID);
    // Declare and Initialize a variable for event
    var eventEmitted = false;

    // Watch the emitted event Harvested()
    supplyChain.Fertilised(null, (err, res) => {
      eventEmitted = true;
    });
    // await event.watch();

    // Mark an item as Harvested by calling function harvestItem()
    await supplyChain.fertiliseItem(upc, originFarmerID);

    // Retrieve the just now saved item from blockchain by calling function fetchItem()
    const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc);
    const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc);
    console.log(resultBufferOne[2]);

    // Verify the result set
    assert.equal(resultBufferOne[1], upc, "Error: Invalid item UPC");
    assert.equal(
      resultBufferOne[2],
      originFarmerID,
      "Error: Missing or Invalid ownerID"
    );
    assert.equal(resultBufferTwo[6], itemState, "Error: Invalid item State");

    // Verify the result set
    assert.equal(eventEmitted, true, "Invalid event emitted");
  });

  it("Testing smart contract function killItem() that allows a farmer to mark a vegetable as dead", async () => {
    const supplyChain = await SupplyChain.deployed();

    itemState++;
    // Declare and Initialize a variable for event
    var eventEmitted = false;

    // Watch the emitted event Harvested()
    supplyChain.Dead(null, (err, res) => {
      eventEmitted = true;
    });

    // Mark an item as Harvested by calling function harvestItem()
    await supplyChain.killItem(upc, deadProductNotes, { from: originFarmerID });

    // Retrieve the just now saved item from blockchain by calling function fetchItem()
    const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc);
    const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc);

    // Verify the result set
    assert.equal(resultBufferOne[1], upc, "Error: Invalid item UPC");
    assert.equal(
      resultBufferTwo[3],
      deadProductNotes,
      "Error: Invalid item Product Notes"
    );

    assert.equal(resultBufferTwo[5], itemState, "Error: Invalid item State");
    assert.equal(eventEmitted, true, "Invalid event emitted");
  });

  it("Testing smart contract function harvestItem() that allows a farmer to harvest a vegetable", async () => {
    const supplyChain = await SupplyChain.deployed();

    itemState++;
    // Declare and Initialize a variable for event
    var eventEmitted = false;

    // Watch the emitted event Harvested()
    supplyChain.Harvested(null, (err, res) => {
      eventEmitted = true;
    });
    await supplyChain.fertiliseItem(upc, originFarmerID);

    // Mark an item as Harvested by calling function harvestItem()
    await supplyChain.harvestItem(
      upc,
      productNotes,
      originFarmerID,
      originFarmName,
      originFarmInformation,
      originFarmLatitude,
      originFarmLongitude,
      { from: originFarmerID }
    );

    // Retrieve the just now saved item from blockchain by calling function fetchItem()
    const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc);
    const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc);

    // Verify the result set
    assert.equal(resultBufferOne[0], sku, "Error: Invalid item SKU");
    assert.equal(resultBufferOne[1], upc, "Error: Invalid item UPC");
    assert.equal(
      resultBufferOne[2],
      originFarmerID,
      "Error: Missing or Invalid ownerID"
    );
    assert.equal(
      resultBufferOne[3],
      originFarmerID,
      "Error: Missing or Invalid originFarmerID"
    );
    assert.equal(
      resultBufferOne[4],
      originFarmName,
      "Error: Missing or Invalid originFarmName"
    );
    assert.equal(
      resultBufferOne[5],
      originFarmInformation,
      "Error: Missing or Invalid originFarmInformation"
    );
    assert.equal(
      resultBufferOne[6],
      originFarmLatitude,
      "Error: Missing or Invalid originFarmLatitude"
    );
    assert.equal(
      resultBufferOne[7],
      originFarmLongitude,
      "Error: Missing or Invalid originFarmLongitude"
    );
    assert.equal(resultBufferTwo[5], itemState, "Error: Invalid item State");
    assert.equal(eventEmitted, true, "Invalid event emitted");
  });

  // 3rd Test
  it("Testing smart contract function packageItem() that allows a farmer to package a vegetable", async () => {
    const supplyChain = await SupplyChain.deployed();
    // await supplyChain.addFarmer(originFarmerID);
    itemState++;
    // Declare and Initialize a variable for event
    var eventEmitted = false;

    // Watch the emitted event Harvested()
    supplyChain.Packaged(null, (err, res) => {
      eventEmitted = true;
    });

    // Mark an item as Harvested by calling function harvestItem()
    await supplyChain.packageItem(upc, { from: originFarmerID });

    // Retrieve the just now saved item from blockchain by calling function fetchItem()
    const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc);
    const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc);

    // Verify the result set
    assert.equal(resultBufferOne[0], sku, "Error: Invalid item SKU");
    assert.equal(resultBufferOne[1], upc, "Error: Invalid item UPC");
    assert.equal(resultBufferTwo[5], itemState, "Error: Invalid item State");
    assert.equal(eventEmitted, true, "Invalid event emitted");
  });

  // 4th Test
  it("Testing smart contract function sellItem() that allows a farmer to sell coffee", async () => {
    const supplyChain = await SupplyChain.deployed();
    // await supplyChain.addFarmer(originFarmerID);
    itemState++;
    // Declare and Initialize a variable for event
    var eventEmitted = false;

    // Watch the emitted event Harvested()
    supplyChain.ForSale(null, (err, res) => {
      eventEmitted = true;
    });

    // Mark an item as Harvested by calling function harvestItem()
    await supplyChain.sellItem(upc, productPrice, { from: originFarmerID });

    // Retrieve the just now saved item from blockchain by calling function fetchItem()
    const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc);
    const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc);
    // console.log(resultBufferTwo);
    // Verify the result set
    assert.equal(resultBufferOne[0], sku, "Error: Invalid item SKU");
    assert.equal(resultBufferOne[1], upc, "Error: Invalid item UPC");
    assert.equal(resultBufferTwo[4], productPrice, "Error: Invalid item Price");
    assert.equal(resultBufferTwo[5], itemState, "Error: Invalid item State");
    assert.equal(eventEmitted, true, "Invalid event emitted");
  });

  // 5th Test
  it("Testing smart contract function buyItem() that allows a distributor to buy coffee", async () => {
    const supplyChain = await SupplyChain.deployed();
    await supplyChain.addDistributor(distributorID);

    itemState++;
    // Declare and Initialize a variable for event
    var eventEmitted = false;

    // Watch the emitted event Harvested()
    supplyChain.Sold(null, (err, res) => {
      eventEmitted = true;
    });

    // Mark an item as Sold by calling function buyItem()
    await supplyChain.buyItem(upc, {
      from: distributorID,
      value: productPrice,
    });

    // Retrieve the just now saved item from blockchain by calling function fetchItem()
    const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc);
    const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc);
    console.log(distributorID);
    console.log(Number(resultBufferTwo[5]));
    // Verify the result set
    assert.equal(resultBufferOne[0], sku, "Error: Invalid item SKU");
    assert.equal(resultBufferOne[1], upc, "Error: Invalid item UPC");
    assert.equal(resultBufferTwo[5], itemState, "Error: Invalid item State");
    assert.equal(eventEmitted, true, "Invalid event emitted");
  });

  // 6th Test
  it("Testing smart contract function shipItem() that allows a distributor to ship coffee", async () => {
    const supplyChain = await SupplyChain.deployed();

    itemState++;
    // Declare and Initialize a variable for event
    var eventEmitted = false;

    // Watch the emitted event Harvested()
    supplyChain.Shipped(null, (err, res) => {
      eventEmitted = true;
    });

    // Mark an item as Sold by calling function buyItem()
    await supplyChain.shipItem(upc, {
      from: distributorID,
    });

    // Retrieve the just now saved item from blockchain by calling function fetchItem()
    const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc);
    const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc);
    // console.log(resultBufferTwo);
    // Verify the result set
    assert.equal(resultBufferOne[0], sku, "Error: Invalid item SKU");
    assert.equal(resultBufferOne[1], upc, "Error: Invalid item UPC");
    assert.equal(
      resultBufferTwo[6],
      distributorID,
      "Error: Invalid item State"
    );

    assert.equal(resultBufferTwo[5], itemState, "Error: Invalid item State");
    assert.equal(eventEmitted, true, "Invalid event emitted");
  });

  // 7th Test
  it("Testing smart contract function receiveItem() that allows a retailer to mark coffee received", async () => {
    const supplyChain = await SupplyChain.deployed();
    await supplyChain.addRetailer(retailerID);

    itemState++;
    // Declare and Initialize a variable for event
    var eventEmitted = false;

    // Watch the emitted event Harvested()
    supplyChain.Received(null, (err, res) => {
      eventEmitted = true;
    });

    // Mark an item as Sold by calling function buyItem()
    await supplyChain.receiveItem(upc, { from: retailerID });

    // Retrieve the just now saved item from blockchain by calling function fetchItem()
    const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc);
    const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc);
    // console.log(resultBufferTwo);
    // Verify the result set
    assert.equal(resultBufferOne[0], sku, "Error: Invalid item SKU");
    assert.equal(resultBufferOne[1], upc, "Error: Invalid item UPC");
    assert.equal(resultBufferTwo[5], itemState, "Error: Invalid item State");
    assert.equal(resultBufferTwo[7], retailerID, "Error: Invalid item State");

    assert.equal(eventEmitted, true, "Invalid event emitted");
  });

  // 8th Test
  it("Testing smart contract function purchaseItem() that allows a consumer to purchase coffee", async () => {
    const supplyChain = await SupplyChain.deployed();
    await supplyChain.addConsumer(consumerID);

    itemState++;
    // Declare and Initialize a variable for event
    var eventEmitted = false;

    // Watch the emitted event Harvested()
    supplyChain.Purchased(null, (err, res) => {
      eventEmitted = true;
    });

    // Mark an item as Sold by calling function buyItem()
    await supplyChain.purchaseItem(upc, { from: consumerID });

    // Retrieve the just now saved item from blockchain by calling function fetchItem()
    const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc);
    const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc);
    // console.log(resultBufferTwo);
    // Verify the result set
    assert.equal(resultBufferOne[0], sku, "Error: Invalid item SKU");
    assert.equal(resultBufferOne[1], upc, "Error: Invalid item UPC");
    assert.equal(resultBufferTwo[5], itemState, "Error: Invalid item State");
    assert.equal(resultBufferTwo[8], consumerID, "Error: Invalid item State");

    assert.equal(eventEmitted, true, "Invalid event emitted");
  });

  // 9th Test
  it("Testing smart contract function fetchItemBufferOne() that allows anyone to fetch item details from blockchain", async () => {
    const supplyChain = await SupplyChain.deployed();
    // Retrieve the just now saved item from blockchain by calling function fetchItem()
    const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc);
    const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc);

    // Verify the result set
    assert.equal(resultBufferOne[0], sku, "Error: Invalid item SKU");
    assert.equal(resultBufferOne[1], upc, "Error: Invalid item UPC");
    assert.equal(
      resultBufferOne[2],
      consumerID,
      "Error: Missing or Invalid ownerID"
    );
    assert.equal(
      resultBufferOne[3],
      originFarmerID,
      "Error: Missing or Invalid originFarmerID"
    );
    assert.equal(
      resultBufferOne[4],
      originFarmName,
      "Error: Missing or Invalid originFarmName"
    );
    assert.equal(
      resultBufferOne[5],
      originFarmInformation,
      "Error: Missing or Invalid originFarmInformation"
    );
    assert.equal(
      resultBufferOne[6],
      originFarmLatitude,
      "Error: Missing or Invalid originFarmLatitude"
    );
    assert.equal(
      resultBufferOne[7],
      originFarmLongitude,
      "Error: Missing or Invalid originFarmLongitude"
    );
    assert.equal(resultBufferTwo[5], itemState, "Error: Invalid item State");
  });

  // 10th Test
  it("Testing smart contract function fetchItemBufferTwo() that allows anyone to fetch item details from blockchain", async () => {
    const supplyChain = await SupplyChain.deployed();

    // Retrieve the just now saved item from blockchain by calling function fetchItem()
    const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc);
    const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc);

    // Verify the result set
    assert.equal(resultBufferOne[0], sku, "Error: Invalid item SKU");
    assert.equal(resultBufferOne[1], upc, "Error: Invalid item UPC");
    assert.equal(
      resultBufferOne[2],
      consumerID,
      "Error: Missing or Invalid ownerID"
    );
    assert.equal(
      resultBufferOne[3],
      originFarmerID,
      "Error: Missing or Invalid originFarmerID"
    );
    assert.equal(
      resultBufferOne[4],
      originFarmName,
      "Error: Missing or Invalid originFarmName"
    );
    assert.equal(
      resultBufferOne[5],
      originFarmInformation,
      "Error: Missing or Invalid originFarmInformation"
    );
    assert.equal(
      resultBufferOne[6],
      originFarmLatitude,
      "Error: Missing or Invalid originFarmLatitude"
    );
    assert.equal(
      resultBufferOne[7],
      originFarmLongitude,
      "Error: Missing or Invalid originFarmLongitude"
    );
    assert.equal(resultBufferTwo[5], itemState, "Error: Invalid item State");
  });
});
