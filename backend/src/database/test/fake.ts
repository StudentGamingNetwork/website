import { merge, set } from "lodash-es";
import { JSONSchemaFaker } from "json-schema-faker";
import { faker } from "@faker-js/faker/locale/fr";
import { PartialDeep } from "type-fest";
import Mongo from "@/database";

JSONSchemaFaker.extend("faker", () => {
    return faker;
});

JSONSchemaFaker.format("objectId", () => {
    return new Mongo.Types.ObjectId();
});

JSONSchemaFaker.option({
    alwaysFakeOptionals: true,
    resolveJsonPath: true
});

export async function generate<DataModel extends typeof Mongo.Model>(model: DataModel, overwrite?: PartialDeep<InstanceType<DataModel>>): Promise<InstanceType<DataModel>> {
    const jsonSchema = makeJsonSchema(model.schema);
    let fake = await JSONSchemaFaker.resolve(jsonSchema);
    fake = merge(fake, overwrite);
    const generatedModel = await model.create(fake);
    return generatedModel as InstanceType<DataModel>;
}

function makeJsonSchema(model: Mongo.Schema): any {
    const properties = {};

    model.eachPath((path, schemaType) => {
        if (!(schemaType as any).isRequired && !(schemaType as any).options.faker) {
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
            set(properties, path, { ...options, ...value });
        }
    });

    return {
        properties,
        type: "object"
    };
}
