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
            if(!!category && this.hasChildren(category)){
                this.items.push({
                    title: '',
                    categories: this.getChildren(category),
                });
            } else if(category) {
                this.data.category_id = category.id;
            }
        },
    },
};
