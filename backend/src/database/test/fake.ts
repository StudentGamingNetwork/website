import _ from "lodash";
import * as jsf from "json-schema-faker";
import faker from "faker/locale/fr";
import { PartialDeep } from "type-fest";
import Mongo from "@/database";

jsf.extend("faker", () => {
    return faker;
});

jsf.format("objectId", () => {
    return Mongo.Types.ObjectId();
});

jsf.option({
    alwaysFakeOptionals: true,
    resolveJsonPath: true
});

export async function generate<DataModel extends typeof Mongo.Model>(model: DataModel, overwrite?: PartialDeep<InstanceType<DataModel>>): Promise<InstanceType<DataModel>> {
    const jsonSchema = makeJsonSchema(model.schema);
    let fake = await jsf.resolve(jsonSchema);
    fake = _.merge(fake, overwrite);
    const generatedModel = await model.create(fake);
    return generatedModel as InstanceType<DataModel>;
}

function makeJsonSchema(model: Mongo.Schema): any {
    const properties = {};

    model.eachPath((path, schemaType) => {
        if (!(schemaType as any).isRequired) {
            return;
        }
        const options = (schemaType as any).options;
        let value = null;
        switch (schemaType.constructor.name) {
        case "SchemaString":
            value = { type: "string" };
            break;
        case "SchemaNumber":
            value = { type: "number" };
            break;
        case "SchemaDate":
            value = { format: "date-time", type: "string" };
            break;
        case "ObjectId":
            value = { format: "objectId", type: "string" };
            break;
        }

        if (value) {
            _.set(properties, path, { ...options, ...value });
        }
    });

    return {
        properties,
        type: "object"
    };
}
