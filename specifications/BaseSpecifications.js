class BaseSpecification {

    constructor(criteria) {
        
        this.criteria = [];
        this.includes = [];

        if(criteria?.length > 0) {

            criteria.map((e) => {
                this.addCondition(e);
            })
            
        }
    }

    addCondition(condition) {
        this.criteria.push(condition);
    }

    addInclude(include) {
        this.includes.push(include);
    } 
    toQuery(model) {

        const query = {};

        if (this.criteria.length) {
            
            const whereClause = this.criteria.reduce((acc, condition) => {
                return { ...acc, ...condition };
            }, {});

            Object.defineProperty(query, 'where', {
                enumerable : true ,
                value: whereClause
            })
        }

        if (this.includes.length) {
            
            const includeClause = this.includes;

            Object.defineProperty(query, 'include', {
                enumerable : true ,
                value: includeClause
            })

        }

        return query;
    }
}

export default BaseSpecification;