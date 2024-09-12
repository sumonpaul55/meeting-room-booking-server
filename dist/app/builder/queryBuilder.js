"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class QueryBuilder {
    constructor(modelQuery, query) {
        this.modelQuery = modelQuery;
        this.query = query;
    }
    // search method
    search(searchAbleField) {
        var _a, _b;
        const search = (_a = this.query) === null || _a === void 0 ? void 0 : _a.search;
        if ((_b = this === null || this === void 0 ? void 0 : this.query) === null || _b === void 0 ? void 0 : _b.search) {
            this.modelQuery = this.modelQuery.find({
                $or: [
                    // Add search conditions for the specified fields
                    ...searchAbleField.map((fields) => ({ [fields]: { $regex: search, $options: "i" } })),
                    // Add search condition for the 'amenities' array field
                    { amenities: { $elemMatch: { $regex: search, $options: "i" } } },
                ],
            });
        }
        return this;
    }
    // filtering
    filter() {
        const queryObj = Object.assign({}, this.query); //copy of all queries
        const excludeFields = ["search", "sort", "limit", "range", "page", "fields", "capacity", "roomsId"];
        excludeFields.forEach((el) => delete queryObj[el]);
        this.modelQuery = this.modelQuery.find(queryObj);
        return this;
    }
    // range
    range() {
        const range = this.query.range;
        if (range) {
            const newRange = range.split("-");
            const lowestPrice = Number(newRange[0]);
            const hiestprice = Number(newRange[1]);
            // let rangevalue = newRange.map((range) => new RegExp(`^${range}$`, "i"));
            this.modelQuery = this.modelQuery.find({
                pricePerSlot: { $gte: lowestPrice, $lte: hiestprice },
            });
        }
        return this;
    }
    capcity() {
        var _a;
        const capacity = (_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.capacity;
        if (capacity) {
            const newCapacity = capacity.split("-");
            const lowestPrice = Number(newCapacity[0]);
            const hiestprice = Number(newCapacity[1]);
            // let rangevalue = newRange.map((range) => new RegExp(`^${range}$`, "i"));
            this.modelQuery = this.modelQuery.find({
                capacity: { $gte: lowestPrice, $lte: hiestprice },
            });
        }
        return this;
    }
    //   sort
    sort() {
        var _a;
        const sort = ((_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.sort) || "-createdAt";
        this.modelQuery = this.modelQuery.sort(sort);
        return this;
    }
    // roomsId
    roomsId() {
        const roomsId = this.query.roomsId;
        if (roomsId) {
            const newroomsId = roomsId.split(" ");
            // let rangevalue = newRange.map((range) => new RegExp(`^${range}$`, "i"));
            this.modelQuery = this.modelQuery.find({
                _id: newroomsId,
            });
        }
        return this;
    }
    limit() {
        var _a;
        const limit = Number(((_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.limit) || 6);
        this.modelQuery = this.modelQuery.find().limit(limit);
        return this;
    }
    //   pagination
    paginate() {
        var _a, _b;
        const page = Number((_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.page) || 1;
        const limit = Number((_b = this === null || this === void 0 ? void 0 : this.query) === null || _b === void 0 ? void 0 : _b.limit) || 6;
        const skip = (page - 1) * limit;
        this.modelQuery = this.modelQuery.skip(skip).limit(limit);
        return this;
    }
    countTotal() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const totalQuery = this.modelQuery.getFilter();
            const total = yield this.modelQuery.model.countDocuments(totalQuery);
            const page = Number((_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.page) || 1;
            const limit = Number((_b = this === null || this === void 0 ? void 0 : this.query) === null || _b === void 0 ? void 0 : _b.limit) || 6;
            const totalPage = Math.ceil(total / limit);
            return {
                page,
                limit,
                total,
                totalPage,
            };
        });
    }
}
exports.default = QueryBuilder;
