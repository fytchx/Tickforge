(() => {
  const SCHOOL_KEYS=['Physical','Lightning','Fire','Poison','Bleed','Frost','Disease'];
  class Combat {
    constructor() {
      this.state={elapsedMs:0,gcdRemaining:0,resource:0,playerHp:100,stage:1, enemies:[],abilities:[]};
      this.fpsSamples=[]; this.frameQuality='full';
      this.renderQueue=[];
    }
    async init() {
      const [abilities,enemies]=await Promise.all([
        fetch('data/abilities.json').then(r=>r.json()), fetch('data/enemies.json').then(r=>r.json())
      ]);
      this.state.abilities=abilities.slice(0,140).map((a,i)=>({...a,cooldownRemaining:i<4?0:500})).slice(0,4);
      this.state.enemies=enemies.slice(0,5).map((e,i)=>({...e,hp:e.hp, maxHp:e.hp,dotRemainingMs:0,dotDamage:0,cooldownRemaining:0}));
      this.bindButtons(); this.render();
      this.engine=new window.Tickforge.TickEngine(this); this.engine.start(); this.monitorFrames();
    }
    processTick(dt) {
      if (this.state.elapsedMs%1000===0) this.state.resource=Math.min(5,this.state.resource+.25);
      this.render();
    }
    bindButtons() {
      window.addEventListener('keydown',(e)=>{const n=Number(e.key)-1;if(n>=0&&n<4)this.cast(n);});
    }
    cast(index) {
      const ability=this.state.abilities[index]; if(!ability||this.state.gcdRemaining>0||ability.cooldownRemaining>0||this.state.resource<ability.resourceCost)return;
      this.state.resource=Math.max(0,this.state.resource-ability.resourceCost+ability.resourceGain);
      ability.cooldownRemaining=ability.cooldownMs;
      if(ability.triggersGcd)this.state.gcdRemaining=window.Tickforge.GCD_BASE_MS;
      const enemy=this.state.enemies.filter(e=>e.hp>0)[index%Math.max(1,this.state.enemies.filter(e=>e.hp>0).length)]||this.state.enemies[0];
      if(enemy){enemy.hp=Math.max(0,enemy.hp-((ability.resourceGain||1)*14+index*5));this.floatText(enemy,ability.name);enemy.dotRemainingMs=ability.school==='Poison'?1500:0;enemy.dotDamage=ability.mathScaling||3;}
      this.render();
    }
    floatText(enemy,text) {
      const rect=enemy.element?.getBoundingClientRect(); if(!rect)return;
      const el=document.createElement('b');el.className='float-text';el.textContent=text;el.style.left=(rect.left+rect.width*.5)+'px';el.style.top=(rect.top+rect.height*.35)+'px';document.body.appendChild(el);setTimeout(()=>el.remove(),700);
    }
    monitorFrames() {
      let last=performance.now(),samples=[];
      const loop=(now)=>{const delta=now-last;last=now;if(delta>0)samples.push(1000/delta);if(samples.length>60)samples.shift();const avg=samples.reduce((a,b)=>a+b,0)/samples.length||60;const quality=avg<15?'cull-all':avg<30?'cull-low':'full';if(quality!==this.frameQuality){this.frameQuality=quality;document.documentElement.classList.remove('fx-cull-low','fx-cull-all');if(quality!=='full')document.documentElement.classList.add(`fx-cull-${quality==='cull-all'?'all':'low'}`);}requestAnimationFrame(loop);};requestAnimationFrame(loop);
    }
    render(){if(window.TickforgeUI)window.TickforgeUI.render(this.state);}
  }
  const combat=new Combat(); combat.SCHOOL_KEYS=SCHOOL_KEYS; window.TickforgeCombat=combat;
  window.addEventListener('DOMContentLoaded',()=>combat.init());
})();
