import SchemaBuilder from "@pothos/core";
import SimpleObjectsPlugin from "@pothos/plugin-simple-objects";

const builder = new SchemaBuilder({
    plugins: [SimpleObjectsPlugin],
});

const UserType = builder.simpleObject("User", {
    fields: (t) => ({
        id: t.id({ nullable: false }),
        name: t.string(),
        email: t.string(),
    }),
});

builder.queryType({
    fields: (t) => ({
        user: t.field({
            nullable: true,
            type: UserType,
            args: {
                id: t.arg.id({ required: true }),
            },
            resolve: (parent, { id }) => {
                if (id !== "1") return null;
                return {
                    id: 1,
                    name: "Joe Bloggs",
                    email: "joe.bloggs@example.com"
                };
            },
        }),
    }),
});

export const schema = builder.toSchema();
