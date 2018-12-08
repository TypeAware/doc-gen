export declare class Foo {
    internal: {
        entities: any;
    };
    constructor();
    addEntity(v: {
        name: string;
    }): void;
}
export declare class Bar extends Foo {
    constructor();
    getEntities(): void;
}
