import * as _ from "lodash";
import {mapActions} from "vuex";

export default {
    data() {
        return {
            category_id: [],
            items: [],
        }
    },
    // computed: {
    //     getRangeValue: function () {
    //         return function (item) {
    //             const id = this.parameters[`params-${item.alias}`];
    //             const parameter = _.find(item.parameters, (parameter) => parameter.id === id);
    //             console.log(parameter.value);
    //             return parameter.value;
    //         };
    //     },
    // },
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
        checkSelectParams(filterId, parameterId, parameters, alias) {
            const parameterFirst = _.first(parameters);
            const filter = _.find(this.data.ad_parameters, function(o) { return (o.filter_id === filterId && o.id === parameterId); });
            const hasParam = !_.isEmpty(filter);
            if (hasParam) {
                this.parameters[`params-${alias}`] = filter.id;
            } else {
                this.parameters[`params-${alias}`] = parameterFirst.id;
            }
            return hasParam;
        },
        checkRangeParams(filterId, parameterId) {
            const filter = _.find(this.data.ad_parameters, function(o) { return (o.filter_id === filterId && o.id === parameterId); });
            return !_.isEmpty(filter);
        },
        checkSelectParamsCheckbox(filterId, parameterId, parameters, alias) {
            const parameter = _.find(this.data.ad_parameters, function(o) { return (o.filter_id === filterId && o.id === parameterId); });
            const hasParam = !_.isEmpty(parameter);
            if (hasParam) {
                this.parameters[`params-${alias}-${parameterId}`] = parameter.id;
            }
            return hasParam;
        },
        changeSelect(event,item) {
            this.parameters[`params-${item.alias}`] = parseInt(event.target.value);
        },
        changeRange(event,item) {
            const parameter = _.find(item.parameters, (parameter) => parameter.value === event.target.value);
            this.parameters[`params-${item.alias}`] = parseInt(parameter.id);
            this.rangeValue[`params-${item.alias}`] = parameter.value;
        },
        getRangeValue(item) {
            // const id = this.parameters[`params-${item.alias}`];
            // const parameter = _.find(item.parameters, (parameter) => parameter.id === id);
            return this.rangeValue[`params-${item.alias}`];
        },
        changeCheckbox(event,parameterId,item) {
            if(event.target.checked) {
                this.parameters[`params-${item.alias}-${parameterId}`] = parseInt(parameterId);
            } else {
                delete this.parameters[`params-${item.alias}-${parameterId}`];
            }

        },
    },
};
