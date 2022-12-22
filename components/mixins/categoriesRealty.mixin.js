import * as _ from 'lodash';
import {mapActions} from 'vuex';
import Vue from 'vue';

export default {
  data() {
    return {
      category_id: [],
      items: [],
      parameters: {},
      rangeValue: {},
      rangeSort: {},
    };
  },
  methods: {
    ...mapActions({
      getItem: 'categoriesRealty/getItem',
    }),
    getChildren(node) {
      return node.categories;
    },
    getChildrenWithRequest(node) {
      const firstCategory = _.first(node.categories);
      if (!_.isEmpty(firstCategory)) {
        this.getItem({id: firstCategory.id});
      }
      return node.categories;
    },
    hasChildren(node) {
      return !_.isEmpty(node.categories);
    },
    hasParent(node) {
      return !_.isEmpty(node.categories_parent);
    },
    getParent(node) {
      return node.categories_parent;
    },
    iterator(tree) {
      const iter = (node, ancestry) => {
        if (_.isArray(node)) {
          return _.flatMap(node, (child) => iter(child, ancestry));
        }
        const newAncestry = _.cloneDeep(ancestry);
        newAncestry.push({
          title: '',
          categories: this.getChildren(node),
        });

        if (!this.hasChildren(node) && node.id === this.data.category_id) {
          return _.filter(newAncestry, (item) => this.hasChildren(item));
        }

        const children = this.getChildren(node);
        return _.flatMap(children, (child) => iter(child, newAncestry));
      };
      const mainCategory = [{
        title: 'Категория',
        categories: this.category,
      }];
      const result = iter(tree, mainCategory);
      return result.length > 0 ? result : mainCategory;
    },
    index(tree) {
      let current = this.data.category_id;
      if (current !== null) {
        this.getItem({id: current});
      }
      const newAncestry = _.cloneDeep(tree);
      const treeReverce = _.reverse(newAncestry);
      return _.reduce(treeReverce, (acc, item) => {
        const cat = _.find(item.categories, (item) => item.id === current);
        if (cat) {
          current = cat.parent_id;
          acc.unshift(cat.id);
          return acc;
        }
      }, []);
    },
    parentIter(tree, path) {
      if (!this.hasParent(tree)) {
        return `/${path}`;
      }
      const parent = this.getParent(tree);
      return this.parentIter(parent, `${parent.alias}/${path}`);
    },
    parentIterator(tree) {
      const iter = (node, ancestry, depth) => {
        const newAncestry = ancestry;
        const path = this.parentIter(node, node.alias);
        newAncestry.push({
          path,
          last: depth === 1,
          name: node.name,
        });
        if (!this.hasParent(node)) {
          return newAncestry;
        }
        const parent = this.getParent(node);
        return iter(parent, newAncestry);
      };
      const result = iter(tree, [], 1);
      return result.reverse();
    },
    setCategory(event, index) {
      this.items.splice(index + 1, Infinity);
      this.category_id.splice(index + 1, Infinity);
      const category = _.find(this.items[index].categories, (item) => item.id == event.target.value);
      const iter = (category) => {
        if (!!category && this.hasChildren(category)) {
          const children = this.getChildren(category);
          this.items.push({
            title: '',
            categories: this.getChildren(category),
          });
          const firstCategory = _.first(children);
          if (this.hasChildren(firstCategory)) {
            iter(firstCategory);
          } else {
            this.getItem({id: firstCategory.id});
            this.data.category_id = firstCategory.id;
          }
        } else if (category) {
          this.getItem({id: category.id});
          this.data.category_id = category.id;
        }
      };
      iter(category);
      if (this.category_id.includes(12) || this.category_id.includes(383) || this.category_id.includes(410)) {
        this.hasName = false;
      } else {
        this.hasName = true;
      }
    },
    setCategoryCreate(event, index) {
      this.items.splice(index + 1, Infinity);
      this.category_id.splice(index + 1, Infinity);
      const category = _.find(this.items[index].categories, (item) => item.id == event.target.value);
      const iter = (category) => {
        if (!!category && this.hasChildren(category)) {
          this.items.push({
            title: '',
            categories: this.getChildren(category),
          });
          this.getItem({id: category.id});
        } else if (category) {
          this.data.category_id = category.id;
          this.getItem({id: category.id});
        }
      };
      iter(category);
      if (this.category_id.includes(12) || this.category_id.includes(383) || this.category_id.includes(410)) {
        this.hasName = false;
      } else {
        this.hasName = true;
      }
      if (_.isEmpty(this.parameters)) {
        setTimeout(() => {
          if (this.filters) {
            this.setSelectParams();
          }
        }, 1700);
      }
    },
    checkSelectParams(filterId, parameterId) {
      const parameter = _.find(this.data.parameters, (o) => (o.filter_id === filterId && o.id === parameterId));
      return !_.isEmpty(parameter);
    },
    getSelectParams(filter, adParameters) {
      return _.reduce(adParameters, (acc, adParam) => {
        const selectParam = _.find(filter.parameters, (filterParam) => (filterParam.filter_id === adParam.filter_id && filterParam.id === adParam.id));
        if (!_.isEmpty(selectParam)) {
          return selectParam.value;
        }
        return acc;
      }, null);
    },
    getCheckboxParams(filterParam, adParameters) {
      const selectParam = _.find(adParameters, (adParam) => (adParam.filter_id === filterParam.filter_id && filterParam.id === adParam.id));
      if (!_.isEmpty(selectParam)) {
        return selectParam.value;
      }
      return null;
    },
    checkFilterParams(filterId, parameterId, parameters, alias) {
      const param = this.parameters[`params-${alias}`];
      const parameter = _.find(parameters, (parameterFilter) => (parameterFilter.id === param));
      return !_.isEmpty(parameter);
    },
    checkRangeParams(filterId, parameterId) {
      const filter = _.find(this.data.parameters, (o) => (o.filter_id === filterId && o.id === parameterId));
      return !_.isEmpty(filter);
    },
    checkCheckboxParams(filterId, parameterId, parameters, alias) {
      const parameter = _.find(this.data.parameters, (o) => (o.filter_id === filterId && o.id === parameterId));
      const hasParam = !_.isEmpty(parameter);
      if (hasParam) {
        Vue.set(this.parameters, `params-${alias}-${parameterId}`, parseInt(parameter.id));
      }
      return hasParam;
    },
    changeSelect(event, item) {
      Vue.set(this.parameters, `params-${item.alias}`, parseInt(event.target.value));
    },
    changeRange(event, item) {
      const parameter = _.find(item.parameters, (parameter) => parseInt(parameter.sort) === parseInt(event.target.value));
      Vue.set(this.parameters, `params-${item.alias}`, parseInt(parameter.id));
      Vue.set(this.rangeValue, `params-${item.alias}`, parseInt(parameter.value));
      Vue.set(this.rangeSort, `params-${item.alias}`, parseInt(parameter.sort));
    },
    changeCheckbox(event, parameterId, item) {
      if (event.target.checked) {
        Vue.set(this.parameters, `params-${item.alias}-${parameterId}`, parseInt(parameterId));
      } else {
        Vue.delete(this.parameters, `params-${item.alias}-${parameterId}`);
      }
    },
    issetCheckbox(parameterId, item) {
      // console.log(this.parameters[`params-${item.alias}-${parameterId}`]);
      return !_.isEmpty(this.parameters[`params-${item.alias}-${parameterId}`]);
    },
    getFilter(cat) {
      return cat?.filters;
    },
    getParamsSelect(realty) {
      return _.sortBy(_.filter(realty?.parameters, (item) => this.isSelect(item.filter)), (item) => item.filter.sort);
    },
    getParamsRange(realty) {
      return _.sortBy(_.filter(realty?.parameters, (item) => this.isRange(item.filter)), (item) => item.filter.sort);
    },
    isFilter(cat) {
      return !_.isEmpty(cat?.filters);
    },
    isSelect(filter) {
      return filter?.type === 'select';
    },
    isRange(filter) {
      return filter?.type === 'range';
    },
    isCheckbox(filter) {
      return filter?.type === 'checkbox';
    },
    min(filter) {
      const values = _.map(filter.parameters, (item) => item.sort);
      return _.min(values);
    },
    max(filter) {
      const values = _.map(filter.parameters, (item) => item.sort);
      return _.max(values);
    },
    minValue(filter) {
      const values = _.map(filter.parameters, (item) => item.sort);
      const sortMin = _.min(values);
      const minParam = _.find(filter.parameters, (item) => item.sort === sortMin);
      return minParam.value;
    },
    maxValue(filter) {
      const values = _.map(filter.parameters, (item) => item.sort);
      const sortMax = _.max(values);
      const maxParam = _.find(filter.parameters, (item) => item.sort === sortMax);
      return maxParam.value;
    },
    valueRange(filter) {
      const minValue = this.min(filter);
      const sort = _.reduce(filter.parameters, (result, item) => {
        if (this.checkRangeParams(item.filter_id, item.id)) {
          return item.sort;
        }
        return result;
      }, minValue);

      return sort;
    },
    setSelectParams() {
      const filter = this.filters.filters;
      const selects = _.filter(filter, (item) => item.type === 'select');
      const ranges = _.filter(filter, (item) => item.type === 'range');
      // console.log(this.filters);
      // const checkboxs = _.filter(filter, (item) => item.type === 'checkbox');
      _.each(selects, (select) => {
        const parameterFirst = _.first(select.parameters);
        let parameterSelect = parameterFirst.id;
        _.each(select.parameters, (item) => {
          const findParameter = _.find(this.data.parameters, (userParams) => (userParams.filter_id === item.filter_id && userParams.id === item.id));
          if (!_.isEmpty(findParameter)) {
            parameterSelect = findParameter.id;
          }
          Vue.set(this.parameters, `params-${select.alias}`, parseInt(parameterSelect));
        });
      });

      _.each(ranges, (range) => {
        const parameterFirst = _.first(range.parameters);
        const parameterRange = parameterFirst;
        Vue.set(this.rangeValue, `params-${range.alias}`, parseInt(parameterFirst.value));
        Vue.set(this.rangeSort, `params-${range.alias}`, parseInt(parameterFirst.sort));
        Vue.set(this.parameters, `params-${range.alias}`, parseInt(parameterRange.id));
        _.each(range.parameters, (item) => {
          const findParameter = _.find(this.data.parameters, (userParams) => (userParams.filter_id == item.filter_id && userParams.id == item.id));
          if (!_.isEmpty(findParameter)) {
            Vue.set(this.rangeValue, `params-${range.alias}`, parseInt(findParameter.value));
            Vue.set(this.rangeSort, `params-${range.alias}`, parseInt(findParameter.sort));
            Vue.set(this.parameters, `params-${range.alias}`, parseInt(findParameter.id));
          }
        });
      });
    },
    setSelectParamsFilter() {
      const filter = this.filters.filters;
      const selects = _.filter(filter, (item) => item.type === 'select');
      // const ranges = _.filter(filter, (item) => item.type === 'range');
      _.each(selects, (select) => {
        Vue.set(this.parameters, `params-${select.alias}`, parseInt(0));
      });
      // _.each(ranges, (range) => {
      // const parameterFirst = _.first(range.parameters);
      // let parameterRange = parameterFirst;
      // Vue.set(this.rangeValue, `params-${range.alias}`, parseInt(parameterFirst.value));
      // Vue.set(this.rangeSort, `params-${range.alias}`, parseInt(parameterFirst.sort));
      // Vue.set(this.parameters, `params-${range.alias}`, parseInt(parameterRange.id));
      // });
    },
    generateTitle(realty) {
      const countRooms = _.find(realty?.parameters, function (item) {
        return item.filter_id === 21 || item.filter_id === 31 || item.filter_id === 66;
      });
      const area = _.find(realty?.parameters, function (item) {
        return item.filter_id === 27 || item.filter_id === 37 || item.filter_id === 70;
      });
      if (area?.sort) {
        return `${countRooms?.sort}-к квартира ${area?.sort} м2`;
      }
      return `${countRooms?.sort}-к квартира`;
    },
    isFlat(realty) {
      return realty?.category_id === 383 || realty?.category_id === 12 || realty?.category_id === 410;
    },
    isBuy(realty) {
      return realty?.category_id === 12;
    },
    isRent(realty) {
      return realty?.category_id === 383;
    },
    getArea(realty) {
      const area = _.find(realty?.parameters, function (item) {
        return item.filter_id === 27 || item.filter_id === 37 || item.filter_id === 70;
      });
      if (area?.value) {
        return area.sort;
      }
    },
    getAreaKitchen(realty) {
      const area = _.find(realty?.parameters, function (item) {
        return item.filter_id === 29 || item.filter_id === 39 || item.filter_id === 72;
      });
      if (area?.value) {
        return area.sort;
      }
    },
    getAreaLeave(realty) {
      const area = _.find(realty?.parameters, function (item) {
        return item.filter_id === 28 || item.filter_id === 38 || item.filter_id === 71;
      });
      if (area?.value) {
        return area.sort;
      }
    },
    getSeller(realty) {
      const seller = _.find(realty?.parameters, function (item) {
        return item.filter_id === 25 || item.filter_id === 35;
      });
      if (seller?.value) {
        return `Продает ${seller?.value.toLowerCase()}`;
      }

    },
    getRooms(realty) {
      const countRooms = _.find(realty?.parameters, function (item) {
        return item.filter_id === 21 || item.filter_id === 31 || item.filter_id === 66;
      });
      if (countRooms?.sort) {
        return `Кол-во комнат ${countRooms?.sort}`;
      }

    },
    getFloor(realty) {
      const countFloor = _.find(realty?.parameters, function (item) {
        return item.filter_id === 23 || item.filter_id === 33 || item.filter_id === 68;
      });
      if (countFloor?.sort) {
        return `Этаж ${countFloor?.sort}`;
      }

    },
    getHouseType(realty) {
      const houseType = _.find(realty?.parameters, function (item) {
        return item.filter_id === 24 || item.filter_id === 34 || item.filter_id === 69;
      });
      if (houseType?.value) {
        return `Тип дома ${houseType?.value}`;
      }
    },
    getTypeRooms(realty) {
      const type = _.find(realty?.parameters, function (item) {
        return item.filter_id === 41 || item.filter_id === 42 || item.filter_id === 74;
      });
      if (type?.value) {
        return `Тип комнат ${type?.value}`;
      }
    },
    getIsNew(realty) {
      const type = _.find(realty?.parameters, function (item) {
        return item.filter_id === 26 || item.filter_id === 36;
      });
      if (type?.value) {
        return `Новизна ${type?.value}`;
      }
    },
    getDateBuild(realty) {
      return `Дата постройки ${realty?.date_build}`;
    },
  },
};
