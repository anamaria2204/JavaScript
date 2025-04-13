document.addEventListener('DOMContentLoaded', function() {
    // Inițializare tabele
    document.querySelectorAll('.sortable').forEach(table => {
        if (table.classList.contains('horizontal')) {
            initHorizontalTable(table);
        } else if (table.classList.contains('vertical')) {
            initVerticalTable(table);
        }
    });
});

/** Funcții pentru tabele orizontale */
function initHorizontalTable(table) {
    const headers = table.querySelectorAll('thead th.sortable');

    headers.forEach((header, colIndex) => {
        header.addEventListener('click', () => {
            // Determină direcția curentă
            let direction;
            if (header.classList.contains('sorted-asc')) {
                direction = 'desc';
            } else if (header.classList.contains('sorted-desc')) {
                direction = 'asc';
            } else {
                direction = 'asc'; // implicit prima dată
            }

            // Resetează toate headerele
            table.querySelectorAll('th.sortable').forEach(h => {
                h.classList.remove('sorted-asc', 'sorted-desc');
            });

            // Setează clasa pe headerul curent
            header.classList.add(`sorted-${direction}`);

            // Sortează efectiv
            sortHorizontalTable(table, colIndex, direction);
        });
    });
}

function sortHorizontalTable(table, colIndex, direction) {
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.rows);

    rows.sort((rowA, rowB) => {
        const cellA = rowA.cells[colIndex].textContent.trim();
        const cellB = rowB.cells[colIndex].textContent.trim();
        return compareValues(cellA, cellB, direction);
    });

    // Reordonează rândurile
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }
    rows.forEach(row => tbody.appendChild(row));
}

/** Funcții pentru tabele verticale */
function initVerticalTable(table) {
    const headers = table.querySelectorAll('tr > th.sortable');

    headers.forEach((header, rowIndex) => {
        header.addEventListener('click', () => {
            // Determină direcția curentă
            let direction;
            if (header.classList.contains('sorted-asc')) {
                direction = 'desc';
            } else if (header.classList.contains('sorted-desc')) {
                direction = 'asc';
            } else {
                direction = 'asc'; // implicit prima dată
            }

            // Resetează toate headerele
            table.querySelectorAll('th.sortable').forEach(h => {
                h.classList.remove('sorted-asc', 'sorted-desc');
            });

            // Setează clasa pe headerul curent
            header.classList.add(`sorted-${direction}`);

            // Sortează efectiv
            sortVerticalTable(table, rowIndex, direction);
        });
    });
}

function sortVerticalTable(table, rowIndex, direction) {
    const rows = Array.from(table.rows);
    const headerRow = rows[rowIndex];
    const cells = Array.from(headerRow.cells).slice(1); // Exclude header cell

    // Creează array de indexuri sortate
    const indexedCells = cells.map((cell, index) => ({
        index,
        value: cell.textContent.trim()
    }));

    indexedCells.sort((a, b) => compareValues(a.value, b.value, direction));

    // Reordonează coloanele în toate rândurile
    rows.forEach(row => {
        const cells = Array.from(row.cells).slice(1);
        const sortedCells = indexedCells.map(item => cells[item.index]);

        // Reordonează celulele
        sortedCells.forEach((cell, i) => {
            row.insertBefore(cell, row.cells[i + 1]); // +1 pentru a sări peste celula antet
        });
    });
}

/** Funcție utilitară pentru comparare */
function compareValues(a, b, direction) {
    // Verifică dacă sunt numere
    const numA = parseFloat(a.replace(/[^\d.-]/g, ''));
    const numB = parseFloat(b.replace(/[^\d.-]/g, ''));

    if (!isNaN(numA) && !isNaN(numB)) {
        return direction === 'asc' ? numA - numB : numB - numA;
    }

    // Comparare text
    return direction === 'asc'
        ? a.localeCompare(b, 'ro', { sensitivity: 'base' })
        : b.localeCompare(a, 'ro', { sensitivity: 'base' });
}