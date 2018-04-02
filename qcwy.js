/*
 爬取前程无忧，搜索条件web前端，地区广州。
 爬取第一页所有公司的公司名称
 * */
var http=require('https');
var fs=require('fs');
var cheerio=require('cheerio');
var iconv=require('iconv-lite');//iconv-lite模块用于解码
var request=require('request');

var url='https://search.51job.com/list/030200,000000,0000,00,9,99,web%25E5%2589%258D%25E7%25AB%25AF,2,1.html?lang=c&stype=&postchannel=0000&workyear=99&cotype=99&degreefrom=99&jobterm=99&companysize=99&providesalary=99&lonlat=0%2C0&radius=-1&ord_field=0&confirmdate=9&fromType=&dibiaoid=0&address=&line=&specialarea=00&from=&welfare=';

function goStart(url){
	http.get(url,function(res){
		var htmlData=[];//用于接收获取到的网页
		var htmlDataLength=0;
		//res.setEncoding('utf-8');
		res.on('data',function(chunk){
			htmlData.push(chunk);
			htmlDataLength+=chunk.length;
		})
		
		res.on('end',function(){
			//数据获取完毕后，开始解码
			var bufferHtmlData=Buffer.concat(htmlData,htmlDataLength);
			var decodeHtmlData=iconv.decode(bufferHtmlData,'gbk');
			var $=cheerio.load(decodeHtmlData,{decodeEntities: false});
			
			
			$('#resultList .el').each(function(index,item){
				if(index!=0){
					var name=$(this).children().eq(1).children().eq(0).text();
					console.log(name);
				}
			})
		})
	})
}
goStart(url);
