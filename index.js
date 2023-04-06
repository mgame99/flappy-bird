const e=new Image,t=new Image,i=new Image,r=new Image,a=new Image,n=new Image,g=new Image,s=new Image,o=new Audio,d=new Audio;o.src="./sounds/score.mp3",d.src="./sounds/die.mp3";const c=[{name:e,url:"./images/bird.png"},{name:t,url:"./images/bg.png"},{name:i,url:"./images/ground.png"},{name:a,url:"./images/pipebottom.png"},{name:r,url:"./images/pipetop.png"},{name:n,url:"./images/pause.png"},{name:g,url:"./images/play.png"},{name:s,url:"./images/gameover.png"}];let m=40,h=2;function p(){d.play(),d.pause(),d.currentTime=0,o.play(),o.pause(),o.currentTime=0,document.body.removeEventListener("click",p),document.body.removeEventListener("touchstart",p)}async function u(e,t){return new Promise(((i,r)=>{t.onload=()=>i(t),t.onerror=r,t.src=e}))}const l={scene:document.getElementById("scene"),ctx:this.scene.getContext("2d"),bgHeight:0,game:{isPause:!1,isOver:!1,isStart:!1,score:0,maxScore:299,overPosition:90,overPositionBase:90,isReady:!0,bestScore:0},ground:{x1:0,x2:0},bird:{width:56,height:40,sprite:0,isSpriteEnd:!1,x:0,y:0,toY:0,angle:0,changeSprite:null},pipe:{arr:[],minHeight:40},init:()=>{l.game.bestScore=localStorage.getItem("bestscore"),l.setInit(!1),window.addEventListener("resize",(()=>{l.setInit(!0)})),l.createBg(),document.addEventListener("keyup",(e=>{const t=e.key;"ArrowUp"!==t&&" "!==t||l.jump()})),l.scene.addEventListener("click",(e=>{const t=e.offsetX,i=e.offsetY;t<=47&&t>=10&&i<=50&&i>=10&&l.game.isStart?l.game.isOver&&!0===l.game.isReady?(l.game.isOver=!1,l.game.score=0,l.game.isStart=!1,l.pipe.arr=[],l.birdPosition(),l.changeBirdSprite(),l.play()):!0===l.game.isReady&&(l.game.isPause?l.play():l.pause()):l.jump()})),l.play()},setInit:e=>{e||(l.ctx.imageSmoothingEnabled=!0,l.ctx.imageSmoothingQuality="high",l.ground.x2=i.naturalWidth,l.changeBirdSprite()),window.innerHeight>500?(m=80,h=4,l.pipe.minHeight=50,window.innerHeight>800&&window.innerWidth<500?(l.ground.height=220,l.pipe.space=170):window.innerHeight>640?(l.ground.height=150,l.pipe.space=170):(l.ground.height=90,l.pipe.space=160)):(l.pipe.space=140,l.ground.height=40,m=40,h=2,l.pipe.minHeight=30),l.setScene(),l.birdPosition(e),l.game.isOver&&(l.play(),l.pause(),l.bird.y=l.bgHeight-l.bird.height)},setScene:()=>{l.scene.height=window.innerHeight<=t.naturalHeight?window.innerHeight:t.naturalHeight;const e=t.naturalWidth*(l.scene.height/t.naturalHeight);l.scene.width=window.innerWidth<=e?window.innerWidth:e,l.bgHeight=l.scene.height-l.ground.height,l.pipe.between=l.scene.width/2-r.naturalWidth,l.game.overPosition=l.bgHeight-s.naturalHeight,l.game.overPositionBase=l.bgHeight-s.naturalHeight},birdPosition:e=>{e?(l.bird.x=l.scene.width/8,l.game.isStart||(l.bird.y=l.bgHeight/2-l.bird.height/2,l.bird.toY=l.bird.y)):(l.bird.x=l.scene.width/8,l.bird.y=l.bgHeight/2-l.bird.height/2,l.bird.toY=l.bird.y,l.bird.angle=0)},changeBirdSprite:()=>{l.bird.changeSprite=setInterval((()=>{l.bird.isSpriteEnd?l.bird.sprite--:l.bird.sprite++,2===l.bird.sprite&&(l.bird.isSpriteEnd=!0),0===l.bird.sprite&&(l.bird.isSpriteEnd=!1)}),120)},createBg:()=>{const e=t.naturalWidth,i=t.naturalHeight,r=e*(l.scene.height/i);l.ctx.drawImage(t,0,0,e,i,0,-l.ground.height,r,l.scene.height)},createGround:()=>{const e=i.naturalWidth,t=i.naturalHeight,r=l.game.isOver?0:2;l.ground.x1<=-i.width&&(l.ground.x1=i.width),l.ground.x2<=-i.width&&(l.ground.x2=i.width),l.ctx.clearRect(0,l.scene.height-l.ground.height,l.scene.width,l.ground.height),l.ctx.drawImage(i,0,0,e,t,l.ground.x1-=r,l.scene.height-l.ground.height,e,t),l.ctx.drawImage(i,0,0,e,t,l.ground.x2-=r,l.scene.height-l.ground.height,e,t)},createBird:()=>{if(l.game.isStart){let e=l.game.isOver?9:6;l.bird.toY<l.bird.y&&!l.game.isOver?(l.bird.angle=-20,l.bird.y-=h):l.bird.y<=l.bgHeight-(l.bird.height+8)?(l.bird.toY+=e,l.bird.y+=e,l.bird.angle<82&&(l.bird.angle+=e)):l.gameOver()}const t=e.naturalWidth,i=e.naturalHeight,r=t/3,a=l.bird.x+.5*l.bird.width,n=l.bird.y+.5*l.bird.height;l.ctx.save(),l.ctx.translate(a,n),l.ctx.rotate(Math.PI/180*l.bird.angle),l.ctx.translate(-a,-n),l.ctx.drawImage(e,r*l.bird.sprite,0,r,i,l.bird.x,l.bird.y,l.bird.width,l.bird.height),l.ctx.restore(),l.checkBird()},checkBird:()=>{const e=l.pipe.arr[l.game.score];e&&e.x1<=l.bird.x+l.bird.width&&l.bird.x-70<=e.x1?(e.y+l.pipe.space-l.bird.height<=l.bird.y||e.y>l.bird.y)&&(l.game.isOver||l.gameOver()):e&&l.bird.x-70>=e.x1&&(o.play(),l.game.score+=1,l.game.score>l.game.bestScore&&(l.game.bestScore=l.game.score,localStorage.setItem("bestscore",l.game.bestScore))),l.game.score===l.game.maxScore&&(console.log(l.pipe.arr[l.game.score-1].x1),l.pipe.arr[l.game.score-1].x1<-70&&(l.pause(),setTimeout((()=>{alert("Congratulations 🥳🎉🎊🎂🎁🎇🎆🥳 Good luck"),alert("🥇")}),100)))},createPipe:()=>{const e=r.naturalWidth,t=r.naturalHeight,i=l.game.isOver||!l.game.isStart?0:2;for(let n=0;n<l.pipe.arr.length;n++){const g=l.pipe.arr[n];l.ctx.drawImage(r,0,0,e,t,g.x2-=i,-(t-g.y),e,t),l.ctx.drawImage(a,0,0,e,t,g.x1-=i,g.y+l.pipe.space,e,t)}},pushPipe:()=>{if(l.game.maxScore===l.pipe.arr.length||l.game.isOver||!l.game.isStart)return;const e=l.pipe.arr.length;if(0===e||l.pipe.arr[e-1].x1<=l.pipe.between){const e=l.bgHeight-l.pipe.minHeight-l.pipe.space;l.pipe.arr.push({x1:l.scene.width,x2:l.scene.width,y:Math.floor(Math.random()*(e-l.pipe.minHeight+1)+l.pipe.minHeight)})}},createScore:()=>{l.ctx.font="20px Roboto",l.game.isStart?(l.ctx.strokeStyle="#ffffff80",l.ctx.strokeText(`${l.game.score}`,60,35)):null!==l.game.bestScore&&(l.ctx.fillStyle="#bd58067d",l.ctx.fillText(`Your best score: ${l.game.bestScore}`,60,35))},jump:()=>{l.game.isStart||(l.game.isStart=!0),l.game.isOver||!0!==l.game.isReady||l.game.isPause||(l.bird.toY=l.bird.y,l.bird.toY=Math.max(l.bird.toY+-m,3))},gameOver:()=>{l.game.isOver||(d.play(),l.game.isReady="loading",l.game.isOver=!0,clearInterval(l.bird.changeSprite),l.bird.sprite=1,setTimeout((()=>{l.pause(),l.game.isReady=!0}),1500))},pause:()=>{l.game.isPause=!0,window.cancelAnimationFrame(l.playGame)},play:()=>{l.game.isPause=!1,window.requestAnimationFrame(l.playGame)},createButton:()=>{l.game.isStart?l.ctx.drawImage(l.game.isPause?g:n,10,10):l.ctx.drawImage(g,10,10)},showGameOver:()=>{const e=l.scene.width/2-s.naturalWidth/2,t=l.game.overPosition>=l.game.overPositionBase-40;l.ctx.drawImage(s,e,l.game.overPosition-=t?2:0)},playGame:()=>{l.ctx.clearRect(0,0,l.scene.width,l.scene.height),l.createBg(),l.pushPipe(),l.createPipe(),l.createBird(),l.createScore(),l.createGround(),l.createButton(),l.game.isOver&&l.showGameOver(),l.game.isPause||window.requestAnimationFrame(l.playGame)}};document.addEventListener("touchmove",(e=>{e.preventDefault()}),{passive:!1}),window.addEventListener("contextmenu",(e=>{e.preventDefault()})),window.addEventListener("load",(async()=>{let e=0;for(const t of c)0===e&&await u(t.url,t.name).catch((()=>e++));0===e?(l.init(),document.querySelector(".preloader").remove(),document.body.addEventListener("click",p),document.body.addEventListener("touchstart",p)):alert("Network Error")}));
