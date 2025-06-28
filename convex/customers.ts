import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";

export const createCustomer = mutation({
    args: {
        customerId: v.string(),
        customerName: v.string(),
        phone: v.string(),
        email: v.string(),
        gstin: v.optional(v.string()),
        pan: v.optional(v.string()),
        customerType: v.union(v.literal("Domestic"), v.literal("Export")),
        groupId: v.id("customerGroups"),
        gradeId: v.optional(v.id("customerGrades")),
        creditLimit: v.optional(v.number()),
        paymentTermsId: v.id("paymentTerms"),
        salesPersonId: v.id("salesPersons"),
        status: v.union(v.literal("Active"), v.literal("Inactive")),
        createdAt: v.number(),
        updatedAt: v.number(),
    },
    handler: async (ctx, args) => {
        const identity = ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Unauthorized: User identity not found");
        }
        // Check if the customer already exists
        const existingCustomer = await ctx.db
            .query("customers")
            .withIndex("by_customer_id", (q) => q.eq("customerId", args.customerId))
            .first();

        if (existingCustomer) return;

        // Insert the new customer into the database
        const now = Date.now();

        await ctx.db.insert("customers", {
            customerId: args.customerId,
            customerName: args.customerName,
            phone: args.phone,
            email: args.email,
            gstin: args.gstin,
            pan: args.pan,
            customerType: args.customerType,
            groupId: args.groupId,
            gradeId: args.gradeId,
            creditLimit: args.creditLimit,
            paymentTermsId: args.paymentTermsId,
            salesPersonId: args.salesPersonId,
            status: args.status,
            createdAt: now,
            updatedAt: now
        });
    },

});

export const updateCustomer = mutation({
    args: {
        customerId: v.string(),
        customerName: v.string(),
        phone: v.string(),
        email: v.string(),
        gstin: v.optional(v.string()),
        pan: v.optional(v.string()),
        customerType: v.union(v.literal("Domestic"), v.literal("Export")),
        groupId: v.id("customerGroups"),
        gradeId: v.optional(v.id("customerGrades")),
        creditLimit: v.optional(v.number()),
        paymentTermsId: v.id("paymentTerms"),
        salesPersonId: v.id("salesPersons"),
        status: v.union(v.literal("Active"), v.literal("Inactive")),
    },
    handler: async (ctx, args) => {
        const customer = await ctx.db
            .query("customers")
            .withIndex("by_customer_id", (q) => q.eq("customerId", args.customerId))
            .first();

        if (!customer) {
            throw new ConvexError("Customer not found");
        }

        await ctx.db.patch(customer._id, {
            customerName: args.customerName,
            phone: args.phone,
            email: args.email,
            gstin: args.gstin,
            pan: args.pan,
            customerType: args.customerType,
            groupId: args.groupId,
            gradeId: args.gradeId,
            creditLimit: args.creditLimit,
            paymentTermsId: args.paymentTermsId,
            salesPersonId: args.salesPersonId,
            status: args.status,
            updatedAt: Date.now(),
        });
    },
});

export const deleteCustomer = mutation({
    args: { customerId: v.string() },
    handler: async (ctx, args) => {
        const customer = await ctx.db
            .query("customers")
            .withIndex("by_customer_id", (q) => q.eq("customerId", args.customerId))
            .first();

        if (!customer) {
            throw new ConvexError("Customer not found");
        }

        await ctx.db.delete(customer._id);
    },
});

// query handles

export const getCustomers = query({
    args: {
        filter: v.optional(v.string()),
        status: v.optional(v.union(v.literal("Active"), v.literal("Inactive"))),
    },
    handler: async (ctx, args) => {
        let customersQuery;

        if (args.filter) {
            customersQuery = ctx.db
                .query("customers")
                .withIndex("by_customer_id", (q) =>
                    q.eq("customerId", args.filter!)
                );
        } else {
            customersQuery = ctx.db.query("customers");
        }

        if (args.status) {
            customersQuery = customersQuery.filter(q => q.eq(q.field("status"), args.status));
        }

        return await customersQuery.collect();
    }
})

export const getCustomerById = query({
    args: { customerId: v.string() },
    handler: async (ctx, args) => {
        const customer = await ctx.db
            .query("customers")
            .withIndex("by_customer_id", (q) => q.eq("customerId", args.customerId))
            .first();

        if (!customer) {
            throw new ConvexError("Customer not found");
        }

        return customer;
    },
});

export const getAllCustomers = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("customers").collect();
    },
});
