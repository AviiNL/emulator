export class List<T> extends Array {

    first() {
        if(this.length === 0) {
            return null;
        }

        return this[0];
    }

    last() {
        if(this.length === 0) {
            return null;
        }

        return this[this.length - 1];
    }

}
