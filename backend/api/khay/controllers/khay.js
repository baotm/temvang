'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    async findonlyname (ctx) {
        const result = await strapi.query('khay').model.find().select({
            ten: 1,
            mota: 1,
            soluongmon: 1,
            hienthi: 1
        })
        ctx.send(result)
    },
    async selectkhaywhensanphamavailable (ctx) {
        const result = await strapi.query('khay').model.find();
        //filter san pham

        ctx.send(result)
    },
};
