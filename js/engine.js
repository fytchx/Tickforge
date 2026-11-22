(() => {
  const TICK_MS = 50;
  const GCD_BASE_MS = 1200;
  class TickEngine {
    constructor(combat) { this.combat=combat; this.accumulator=0; this.last=performance.now(); this.running=true; }
    start() { requestAnimationFrame((now)=>this.frame(now)); }
    frame(now) {
      if (!this.running) return;
      let delta=Math.min(now-this.last,250); this.last=now; this.accumulator+=delta;
      while (this.accumulator>=TICK_MS) { this.tick(TICK_MS); this.accumulator-=TICK_MS; }
      requestAnimationFrame((next)=>this.frame(next));
    }
    tick(dt) {
      this.combat.state.elapsedMs += dt;
      this.combat.state.gcdRemaining = Math.max(0,this.combat.state.gcdRemaining-dt);
      for (const enemy of this.combat.state.enemies) {
        enemy.cooldownRemaining = Math.max(0,(enemy.cooldownRemaining||0)-dt);
        if (enemy.dotRemainingMs>0) { enemy.dotRemainingMs-=dt; if (enemy.dotRemainingMs%250===0) enemy.hp=Math.max(0,enemy.hp-enemy.dotDamage); }
      }
      for (const ability of this.combat.state.abilities) ability.cooldownRemaining=Math.max(0,ability.cooldownRemaining-dt);
      this.combat.state.resource=Math.min(5,this.combat.state.resource+dt/10000);
      this.combat.processTick(dt);
    }
  }
  window.Tickforge={TickEngine,GCD_BASE_MS,TICK_MS};
})();
