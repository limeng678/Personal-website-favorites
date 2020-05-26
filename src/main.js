const $siteList = $('.siteList')
const $lastLi =$siteList.find('li.last')
const x = localStorage.getItem('x')
const xObjext = JSON.parse(x)
const hashMap=xObjext || [
    {logo:'Z',url:'https://www.zhihu.com'},
    {logo:'B',url:'https://www.bilibili.com'},
]


const simplifyUrl = (url) => {
    return url.replace('https://', '')
      .replace('http://', '')
      .replace('www.', '')
      .replace(/\/.*/, '') // 删除 / 开头的内容
  }

const render = ()=>{
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node,index)=>{
        const $li = $(
              `<li>
                        <div class="site">
                           <div class="logo"> ${node.logo} </div>
                           <div class="link">${simplifyUrl(node.url)}</div>
                           <div class="close">
                              <svg class="icon" >
                                 <use xlink:href="#icon-close"></use>
                              </svg>
                           </div>                         
                       </div>
                 
                </li> `).insertBefore($lastLi)

                $li.on('click', ()=>{
                    window.open(node.url)
                })
                 
                $li.on('click','.close',(e)=>{
                    e.stopPropagation()
                    hashMap.splice(index,1)
                    render()
            
                })

    });

}

render()

$('.addButton').on('click',()=>{
   let url= window.prompt("请输入你要添加的网址")
   if(url.indexOf('http')!==0){
       url='https://'+url
   }
   
  hashMap.push({
      logo:simplifyUrl(url)[0].toUpperCase(), 
      url:url
    });
      
    render()

});
window.onbeforeunload = ()=>{
    const string = JSON.stringify(hashMap)
    localStorage.setItem('x',string)
}
$(document).on('keypress',(e)=>{
    const {key}=e
    for(let i=0;i<hashMap.length;i++){
        if(hashMap[i].logo.toLowerCase()===key){
            window.open(hashMap[i].url)
        }
    }
})