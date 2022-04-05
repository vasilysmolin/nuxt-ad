import * as _ from "lodash";

export default {
    data() {
        return {
            category_id: [],
            items: [],
        }
    },
    methods: {
        getChildren(node) {
            return node.categories;
        },
        hasChildren(node) {
            return !_.isEmpty(node.categories);
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
            return iter(tree, [{
                title: 'Категория',
                categories: this.category,
            }]);
        },
        index(tree) {
            let current = this.data.category_id;
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
        setCategory(event,index) {
            this.items.splice(index + 1, Infinity);
            this.category_id.splice(index + 1, Infinity);
            let category = _.find(this.items[index].categories, (item) => item.id == event.target.value);
            if(this.hasChildren(category)){
                this.items.push({
                    title: '',
                    categories: this.getChildren(category),
                });
            } else {
                this.data.category_id = category.id;
            }
        },
    },
};
