alert('doido');class Node<T> {
    value: T;
    next: Node<T> | null = null;
    prev: Node<T> | null = null;

    constructor(value: T) {
        this.value = value;
    }
}

class DoublyLinkedList<T> {
    private head: Node<T> | null = null;
    private tail: Node<T> | null = null;
    private length: number = 0;

    isEmpty(): boolean {
        return this.length === 0;
    }

    size(): number {
        return this.length;
    }

    clear(): void {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    insertAtStart(value: T): void {
        const newNode = new Node(value);
        if (this.isEmpty()) {
            this.head = this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head!.prev = newNode;
            this.head = newNode;
        }
        this.length++;
    }

    insertAtEnd(value: T): void {
        const newNode = new Node(value);
        if (this.isEmpty()) {
            this.head = this.tail = newNode;
        } else {
            this.tail!.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
        }
        this.length++;
    }

    insertAt(value: T, index: number): void {
        if (index < 0 || index > this.length) {
            console.error("Índice inválido");
            return;
        }
        if (index === 0) {
            this.insertAtStart(value);
            return;
        }
        if (index === this.length) {
            this.insertAtEnd(value);
            return;
        }
        const newNode = new Node(value);
        let current = this.head;
        let i = 0;
        while (i < index - 1) {
            current = current!.next;
            i++;
        }
        newNode.next = current!.next;
        newNode.prev = current;
        current!.next!.prev = newNode;
        current!.next = newNode;
        this.length++;
    }

    removeFromStart(): void {
        if (this.isEmpty()) return;
        if (this.head === this.tail) {
            this.head = this.tail = null;
        } else {
            this.head = this.head!.next;
            this.head!.prev = null;
        }
        this.length--;
    }

    removeFromEnd(): void {
        if (this.isEmpty()) return;
        if (this.head === this.tail) {
            this.head = this.tail = null;
        } else {
            this.tail = this.tail!.prev;
            this.tail!.next = null;
        }
        this.length--;
    }

    removeFrom(index: number): void {
        if (index < 0 || index >= this.length) {
            console.error("Índice inválido");
            return;
        }
        if (index === 0) {
            this.removeFromStart();
            return;
        }
        if (index === this.length - 1) {
            this.removeFromEnd();
            return;
        }
        let current = this.head;
        let i = 0;
        while (i < index) {
            current = current!.next;
            i++;
        }
        current!.prev!.next = current!.next;
        current!.next!.prev = current!.prev;
        this.length--;
    }

    displayForward(): void {
        let current = this.head;
        let result = "";
        while (current) {
            result += current.value + " <-> ";
            current = current.next;
        }
        console.log(result + "null");
    }

    displayBackward(): void {
        let current = this.tail;
        let result = "";
        while (current) {
            result += current.value + " <-> ";
            current = current.prev;
        }
        console.log(result + "null");
    }
}

// ---------------------------
// Teste no console do navegador
// ---------------------------
const list = new DoublyLinkedList<number>();

list.insertAtStart(10);
list.insertAtEnd(20);
list.insertAt(15, 1);
list.displayForward();
list.displayBackward();

console.log("Tamanho:", list.size());
console.log("Está vazia?", list.isEmpty());

list.removeFrom(1);
list.displayForward();
list.displayBackward();
