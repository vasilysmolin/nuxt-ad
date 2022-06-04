import * as _ from "lodash";
import {mapActions} from "vuex";

export default {
    data() {
        return {
            category_id: [],
            items: [],
        }
    },
    methods: {
        ...mapActions({
            getItem: 'categoriesAd/getItem',
        }),
        getChildren(node) {
            return node.categories;
        },
        getChildrenWithRequest(node) {
            const firstCategory = _.first(node.categories);
            if(!_.isEmpty(firstCategory)) {
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
                if(_.isArray(node)) {
                    return _.flatMap(node, (child) => iter(child, ancestry));
                }
                let newAncestry = _.cloneDeep(ancestry);
                newAncestry.push({
                    title: '',
                    categories: this.getChildren(node)
                });

                if (!this.hasChildren(node) && node.id === this.data.category_id) {
                    return _.filter(newAncestry, (item) => this.hasChildren(item));
                }

                let children = this.getChildren(node);
                return _.flatMap(children, (child) => iter(child, newAncestry));
            };
            const mainCategory = [{
                title: 'Категория',
                categories: this.category,
            }];
            let result = iter(tree, mainCategory);
            return result.length > 0 ? result : mainCategory;
        },
        index(tree) {
            let current = this.data.category_id;
            if(current !== null) {
                this.getItem({id: current});
            }
            let newAncestry = _.cloneDeep(tree);
            let treeReverce = _.reverse(newAncestry);
            return  _.reduce(treeReverce, function(acc, item) {
                let cat = _.find(item.categories, (item) => item.id === current);
                if (cat) {
                    current = cat.parent_id;
                    acc.unshift(cat.id);
                    return acc;
                }
            },[]);
        },
        parentIter(tree, path){
            if(!this.hasParent(tree)){
                return `/${path}`;
            }
            const parent = this.getParent(tree);
            return this.parentIter(parent, `${parent.alias}/${path}`)

        },
        parentIterator(tree){
            const iter = (node, ancestry, depth) => {
                let newAncestry = ancestry;
                const path = this.parentIter(node, node.alias);
                newAncestry.push({
                    path: path,
                    last: depth === 1,
                    name: node.name,
                });
                if(!this.hasParent(node)){
                    return newAncestry;
                }
                const parent = this.getParent(node);
                return iter(parent,  newAncestry)
            };
            let result = iter(tree, [], 1);
            return result.reverse();

        },
        setCategory(event,index) {
            this.items.splice(index + 1, Infinity);
            this.category_id.splice(index + 1, Infinity);
            let category = _.find(this.items[index].categories, (item) => item.id == event.target.value);
            const iter = (category) => {
                if(!!category && this.hasChildren(category)){
                    const children = this.getChildren(category)
                    this.items.push({
                        title: '',
                        categories: this.getChildren(category),
                    });
                    const firstCategory = _.first(children);
                    if(this.hasChildren(firstCategory)) {
                        iter(firstCategory);
                    } else {
                        this.getItem({id: firstCategory.id});
                        this.data.category_id = firstCategory.id;
                    }
                } else if(category) {
                    this.getItem({id: category.id});
                    this.data.category_id = category.id;
                }
            }
            iter(category);
        },
        setCategoryCreate(event,index) {
            this.items.splice(index + 1, Infinity);
            this.category_id.splice(index + 1, Infinity);
            let category = _.find(this.items[index].categories, (item) => item.id == event.target.value);
            const iter = (category) => {
                if(!!category && this.hasChildren(category)){
                    this.items.push({
                        title: '',
                        categories: this.getChildren(category),
                    });
                    this.getItem({id: category.id});
                } else if(category) {
                    this.data.category_id = category.id;
                    this.getItem({id: category.id});
                }
            }
            iter(category);
        },
        checkSelectParams(filterId, parameterId, parameters, alias) {
            const parameter = _.find(this.data.ad_parameters, function(o) {
                return (o.filter_id === filterId && o.id === parameterId);
            });
            return !_.isEmpty(parameter);
        },
        getSelectParams(filter, adParameters) {
            return _.reduce(adParameters, function(acc, adParam) {
                let selectParam = _.find(filter.parameters, function(filterParam) {
                    return (filterParam.filter_id === adParam.filter_id && filterParam.id === adParam.id);
                });
                if(!_.isEmpty(selectParam)) {
                    return selectParam.value;
                } else {
                    return acc;
                }
            }, 'Не указано');

        },
        getCheckboxParams(filterParam, adParameters) {
            let selectParam = _.find(adParameters, function(adParam) {
                return (adParam.filter_id === filterParam.filter_id && filterParam.id === adParam.id);
            });
            if(!_.isEmpty(selectParam)) {
                return selectParam.value;
            } else {
                return 'Нет';
            }
        },
        checkFilterParams(filterId, parameterId, parameters, alias) {
            const param = this.parameters[`params-${alias}`];
            console.log(param);
            const parameter = _.find(parameters, function(parameterFilter) {
                console.log(parameterFilter.id);
                return (parameterFilter.id === param);
            });
            return !_.isEmpty(parameter);
        },
        checkRangeParams(filterId, parameterId) {
            const filter = _.find(this.data.ad_parameters, function(o) { return (o.filter_id === filterId && o.id === parameterId); });
            return !_.isEmpty(filter);
        },
        checkCheckboxParams(filterId, parameterId, parameters, alias) {
            const parameter = _.find(this.data.ad_parameters, function(o) { return (o.filter_id === filterId && o.id === parameterId); });
            const hasParam = !_.isEmpty(parameter);
            if (hasParam) {
                this.parameters[`params-${alias}-${parameterId}`] = parameter.id;
            }
            return hasParam;
        },
        changeSelect(event,item) {
            // console.log(event);
            // let index = event.target.selectedIndex;
            // event.options[index].selected = true;
            // console.log(index);
            this.parameters[`params-${item.alias}`] = parseInt(event.target.value);
        },
        changeRange(event,item) {
            const parameter = _.find(item.parameters, (parameter) => parameter.value === event.target.value);
            this.parameters[`params-${item.alias}`] = parseInt(parameter.id);
            // this.rangeValue[`params-${item.alias}`] = parseInt(parameter.value);
        },
        changeCheckbox(event,parameterId,item) {
            if(event.target.checked) {
                this.parameters[`params-${item.alias}-${parameterId}`] = parseInt(parameterId);
            } else {
                delete this.parameters[`params-${item.alias}-${parameterId}`];
            }

        },
        getFilter(cat) {
            return cat?.filters;
        },
        isFilter(cat) {
            return !_.isEmpty(cat?.filters);
        },
        isSelect(filter) {
            return filter.type === 'select';
        },
        isRange(filter) {
            return filter.type === 'range';
        },
        isCheckbox(filter) {
            return filter.type === 'checkbox';
        },
        min(filter) {
            const values = _.map(filter.parameters, (item) => item.value);
            return _.min(values);
        },
        max(filter) {
            const values = _.map(filter.parameters, (item) => item.value);
            return _.max(values);
        },
        valueRange(filter) {
            const minValue = this.min(filter);
            return _.reduce(filter.parameters, (result, item) => {
                if(this.checkRangeParams(item.filter_id, item.id)) {
                    return item.value;
                }
                return result;
            }, minValue);
        },
        setSelectParams() {
            const filter = this.filters.filters;
            const selects = _.filter(filter, (item) => item.type === 'select');
            const ranges = _.filter(filter, (item) => item.type === 'range');
            // const checkboxs = _.filter(filter, (item) => item.type === 'checkbox');
            _.each(selects, (select) => {
                const parameterFirst = _.first(select.parameters);
                let parameterSelect = parameterFirst.id;
                // console.log(parameterSelect);
                _.each(select.parameters, (item) => {
                    let findParameter = _.find(this.data.ad_parameters, function(userParams) {
                        return (userParams.filter_id === item.filter_id && userParams.id === item.id);
                    });
                    if(!_.isEmpty(findParameter)) {
                        parameterSelect = findParameter.id;
                    }
                    this.parameters[`params-${select.alias}`] = parameterSelect;
                });
            });

            _.each(ranges, (range) => {
                const parameterFirst = _.first(range.parameters);
                let parameterRange = parameterFirst.id;
                _.each(range.parameters, (item) => {
                    let findParameter = _.find(this.data.ad_parameters, function(userParams) {
                        return (userParams.filter_id === item.filter_id && userParams.id === item.id);
                    });
                    if(!_.isEmpty(findParameter)) {
                        parameterRange = findParameter.id;
                    }
                    this.parameters[`params-${range.alias}`] = parameterRange;
                });
            });
        },
        setSelectParamsFilter(cat) {
            const filter = this.filters.filters;
            const selects = _.filter(filter, (item) => item.type === 'select');
            const ranges = _.filter(filter, (item) => item.type === 'range');
            console.log(selects);
            _.each(selects, (select) => {
                console.log(select.alias);
                this.parameters[`params-${select.alias}`] = 0;
            });
            return cat.filters;
        }
    },
};
