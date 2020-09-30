const container = document.getElementById('container');


function findMines() {
  var rows = document.getElementById('rows').value;
  var cols = document.getElementById('cols').value;
  var mines = document.getElementById('mines').value;
  container.style.setProperty('--grid-rows', rows);
  container.style.setProperty('--grid-cols', cols);
  let mineSlots = [];
  let slot = 0;
  let rules = [
    ['r-1', 'c-1'],
    ['r-1', 'c'],
    ['r-1', 'c+1'],
    ['r', 'c-1'],
    ['r', 'c+1'],
    ['r+1', 'c-1'],
    ['r+1', 'c'],
    ['r+1', 'c+1'],
  ];

  while (mineSlots.length < mines) {
    let pos = Math.floor(Math.random() * (rows * cols)) + 1;
    if (mineSlots.indexOf(pos) === -1) {
      mineSlots.push(pos);
    }
  }
  let slotInfoArr = [];
  for (let r = 1; r <= rows; r++) {
    for (let c = 1; c <= cols; c++) {
      slot++;
      let slotObj = {
        r,
        c,
        slot,
      };
      slotInfoArr.push(slotObj);
      let cell = document.createElement('div');
      let foundDiv = document.createElement('div');
      foundDiv.innerText = "~Found~";
      foundDiv.id = `div${slot}`;
      foundDiv.classList.add("found");
      foundDiv.style.display = 'none';
      cell.appendChild(foundDiv);
      container.appendChild(cell).className = 'grid-item';
      cell.addEventListener('click', function () {
        let adjacentArr = [];
        let itemSlot = document.getElementById(`div${slotObj.slot}`);
        if (mineSlots.indexOf(slotObj.slot) !== -1) {
          itemSlot.style.display = '';
          itemSlot.parentElement.style.backgroundColor='green';
        } else {
          for (let i = 0; i < rules.length; i++) {
            const rule = rules[i];
            let adjElement = slotInfoArr.filter(
              m => m.r == eval(rule[0]) && m.c == eval(rule[1])
            )[0];
            if (adjElement) {
              adjacentArr.push(adjElement);
            }
          }
          let filterMines = adjacentArr.filter(
            m => mineSlots.indexOf(m.slot) !== -1
          );
          itemSlot.style.display = '';
          itemSlot.parentElement.style.backgroundColor='red';
          itemSlot.innerText = `${filterMines.length}`;
        }
      });
    }
  }
}


