export class List<T> extends Array {

    first() {
        return this[0];
    }

    last() {
        return this[this.length - 1];
    }

}
