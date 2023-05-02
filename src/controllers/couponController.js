

    /**
     * 
     * @param {object} obj object to storage group
     * @param {string} field name of the field to groupBy
     * @param {object} coupon the coupon to be grouped
     * @param {string[]} possibleValues Array of the possible values of field to groupBy
     * @returns {void}
     */
    export function groupBy(obj, field, coupon, possibleValues = []) {
      let arr = obj[field];
      if (!arr) {
        arr = [];
        obj[field] = arr;
      }

      let group = arr.find((el) => coupon[field] === el.value);

      if (!group) {
        if (
          possibleValues.length &&
          !possibleValues.some((el) => el === coupon[field])
        ) {
          return;
        }
        group = {
          value: coupon[field],
          coupons: [],
          count: 0,
        };
        arr.push(group);
      }
      group.coupons.push(coupon);
      group.count++;
      //TODO find a better way to do this
      addOrUpdateDiscountInfo(group, coupon);
    }

    /**
     * 
     * @param {object} group group where will add discount info
     * @param {object} coupon coupon to extract discount info
     * @returns 
     */
    function addOrUpdateDiscountInfo(group, coupon) {
      if (!group.discount) {
        group.discount = {
          dollar: {
            _total: 0,
            count: 0,
            max: 0,
            min: Infinity,
            average: 0,
          },
          percent: {
            _total: 0,
            count: 0,
            max: 0,
            min: Infinity,
            average: 0,
          },
        };
      }
      if (!coupon.value) {
        return;
      }

      const discountField =
        coupon.promotion_type === "percent-off"
          ? "percent"
          : coupon.promotion_type === "dollar-off"
          ? "dollar"
          : null;

      if (!discountField) {
        return;
      }

      group.discount[discountField]._total += coupon.value;
      group.discount[discountField].count++;
      group.discount[discountField].max = Math.max(
        group.discount[discountField].max,
        coupon.value
      );
      group.discount[discountField].min = Math.min(
        group.discount[discountField].min,
        coupon.value
      );
      group.discount[discountField].average =
        Math.round(
          (group.discount[discountField]._total * 100) / group.count,
          2
        ) / 100;
    }