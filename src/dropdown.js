import './dropdown.css';

export default class Dropdown {
    constructor(rightAligned, openTarget) {
        this.items = [];
        this.rightAligned = rightAligned || false;

        this.openTarget = openTarget;
        this.openTarget.addEventListener('click', () => this.toggle());
        document.addEventListener('click', (e) => {
            if(this.openTarget.contains(e.target)) {
                return;
            }
            this.close();
        })
    }

    render() {
        this.dropdownList = document.createElement('ul');
        this.dropdownList.classList.add('dropdown')
        if (this.rightAligned) {
            this.dropdownList.classList.add('dropdown-left');
        }

        for (const item of this.items) {
            const dropdownItem = document.createElement('li');
            dropdownItem.classList.add('dropdown-item');

            const dropdownLink = document.createElement('a');
            dropdownLink.classList.add('dropdown-item-link');
            dropdownLink.href = item.link;
            dropdownLink.text = item.title;
            dropdownItem.appendChild(dropdownLink);

            this.dropdownList.appendChild(dropdownItem);
        }

        return this.dropdownList;
    }

    toggle() {
        if (this.dropdownList.classList.contains('visible')) {
            this.close();
        } else {
            this.closeAllOpenDropdowns();
            this.open();
        }
    }

    close() {
        this.dropdownList.classList.remove('visible');
    }

    open() {
        this.dropdownList.classList.add('visible');
    }
    
    closeAllOpenDropdowns() {
        const visibleDropdowns = document.querySelectorAll('.dropdown.visible');
        for (let dropdown of visibleDropdowns) {
            dropdown.classList.remove('visible');
        }
    }

    addItem(title, link) {
        this.items.push({title, link});
    }
}
