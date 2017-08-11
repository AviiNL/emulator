// Clean up Typed Array JSON output
(Uint8Array.prototype as any).toJSON = function() {
    return Array.from(this);
};

(Uint16Array.prototype as any).toJSON = function() {
    return Array.from(this);
};

(Int32Array.prototype as any).toJSON = function() {
    return Array.from(this);
};

let serializeMetaData: any[] = [];

export function serialize(): any {

    return function (target: any, property: string) {
        serializeMetaData.push({
            object: target,
            key: property
        });
    };
}

export class Serializer {

    private static getKeys(obj: any) {
        let keys = [];
        let parent = Object.getPrototypeOf(obj);
        while (parent.constructor.name !== 'Object') {
            for (let i in serializeMetaData) {
                if (serializeMetaData[i].object.constructor === parent.constructor) {
                    keys.push(serializeMetaData[i].key);
                }
            }
            parent = Object.getPrototypeOf(parent);
        }

        return keys;
    }

    static serialize(thisOf: any) {

        let data: any = {};

        for (let key of Serializer.getKeys(thisOf)) {
            data[key] = {
                type: typeof(thisOf[key]) === 'object' ? thisOf[key].constructor.name : null,
                value: thisOf[key]
            };
        }

        return JSON.stringify(data);
    }

    static deserialize(thisOf: any, data: any) {
        data = JSON.parse(data);

        for (let i in data) {
            if (!data.hasOwnProperty(i)) continue;
            if (!thisOf.hasOwnProperty(i)) continue;

            if (data[i].type) {
                thisOf[i] = new (global as any || window as any)[data[i].type](data[i].value);
            } else {
                if (data[i].value) { // ignore undefined or null
                    thisOf[i] = data[i].value;
                }
            }
        }
    }
}
