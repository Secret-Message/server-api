var expect = require("chai").expect;
const { lower_bound, upper_bound } = require('../src/lib/utils/algorithms');
const { parseMessageFilter } = require('../src/lib/filters/message');

const dummy_list = [
    {
        content: "test1",
        value: 1
    },
    {
        content: "test2",
        value: 2
    },
    {
        content: "test3",
        value: 2
    },
    {
        content: "test4",
        value: 3
    },
    {
        content: "test5",
        value: 5
    },
]

describe("MessageFilterLayer0/from", function() {
    it("I dont know what it done", () => {
        expect(1+1).to.equal(2)
    })
});

describe("MessageFilterLayer0/to", function() {
    it("I dont know what it done", () => {
        expect(1+1).to.equal(2)
    })
});

describe("algorithms/lower_bound", function() {
    it("It should find first element with expected value", () => {
        expect( lower_bound(dummy_list , (e) => e.value >= 3) ).to.equal(3);
        expect( lower_bound(dummy_list , (e) => e.value >= 1) ).to.equal(0);
        expect( lower_bound(dummy_list , (e) => e.value >= 2) ).to.equal(1);
        expect( lower_bound(dummy_list , (e) => e.value >= 5) ).to.equal(4);
        //expect( lower_bound(dummy_list , (e) => e.value >= 7) ).to.equal(5);
    })
});

describe("algorithms/upper_bound", function() {
    it("It should find last element with expected value", () => {
        expect( upper_bound(dummy_list , (e) => e.value <= 3) ).to.equal(3);
        expect( upper_bound(dummy_list , (e) => e.value <= 1) ).to.equal(0);
        expect( upper_bound(dummy_list , (e) => e.value <= 2) ).to.equal(2);
        expect( upper_bound(dummy_list , (e) => e.value <= 5) ).to.equal(4);
        //expect( upper_bound(dummy_list , (e) => e.value <= 8) ).to.equal(5);
    })
});