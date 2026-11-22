(() => {
  function render(state) {
    document.getElementById('stageCounter').textContent=`Stage ${state.stage}`;
    document.getElementById('hpText').textContent=`${state.playerHp} / 100`;
    document.getElementById('playerHp').style.width=`${state.playerHp}%`;
    const pips=document.getElementById('resourcePips');pips.innerHTML='';for(let i=0;i<5;i++){const pip=document.createElement('i');pip.className='resource-pip'+(i<Math.floor(state.resource)?' filled':'');pips.appendChild(pip);}
    const board=document.getElementById('enemyBoard');board.innerHTML='';state.enemies.forEach((enemy,i)=>{const card=document.createElement('button');card.type='button';card.className=`enemy tier-${enemy.frameTier||1}`;card.innerHTML=`<img src="${enemy.portraitSvg}" alt=""><b class="enemy-name">${enemy.name}</b><span class="enemy-hp"><i style="width:${Math.max(0,enemy.hp/enemy.maxHp*100)}%"></i></span>`;enemy.element=card;card.addEventListener('click',()=>window.TickforgeCombat.cast(i%4));board.appendChild(card);});
    const hotbar=document.getElementById('hotbar');hotbar.innerHTML='';state.abilities.forEach((a,i)=>{const slot=document.createElement('button');slot.type='button';slot.className='hotbar-slot'+(a.cooldownRemaining===0?' ready':'');slot.innerHTML=`<span class="key">${i+1}</span><span class="name">${a.name}</span>`+(a.cooldownRemaining>0?`<i class="cooldown-sweep" style="opacity:${Math.min(.82,a.cooldownRemaining/a.cooldownMs*.82)}"></i>`:'');slot.addEventListener('click',()=>window.TickforgeCombat.cast(i));hotbar.appendChild(slot);});
  }
  window.TickforgeUI={render};
})();
