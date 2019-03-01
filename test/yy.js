/** 预约签到缴费 JS文件*/
$(function(){
	var itemDatas;
    var dateDatas;
    var tjh; //当前无体检号
    var tjyyrq; // 体检预约时间
    var basePath1,index1,code1;
    var zfje00;
    var dsje00;
    var ydj000;
    var selectionIds = [];  //保存选中数据  
	var selected = []; // 新增数据
	var dataLength; // 用于判断新增项目表格数据长度
	addArray=new Array();
	var zxflData = []; // 选择分类数据
	var xzfl00;	// 分类
	var isEncode = false; // 是否解析过
	var alter =false; //是否修改过项目
//    var sap= new ActiveXObject("Sapi.SpVoice");
	var isGy;
    var gyFlag=$('#gyFlag').val();
    // 公务员教师问卷
	var questiontjlxid = '';
	var questiontjh000;
  var dainfo = '';
  var nowthis1;
  var canvas = document.querySelector("canvas");
  var nowthis; // 现在点击的治愈时间
  var signaturePad = new SignaturePad(canvas, {
    minWidth: 3,
    maxWidth: 5,
    penColor: "rgb(66, 133, 244)",
    backgroundColor: 'rgb(255,255,255)'
  })
$('.bootbox').css('zIndex','99999999999')
  var disease = [{name: '高血压病', id1: 'QA001', id2: 'QA002'}, {name: '心脏病', id1: 'QA003', id2: 'QA004'}, {name: '支气管扩张', id1: 'QA005', id2: 'QA006'}, {name: '支气管哮喘', id1: 'QA007', id2: 'QA008'}, {name: '神经系统疾病', id1: 'QA009', id2: 'QA010'}, {name: '精神病', id1: 'QA011', id2: 'QA012'}, {name: '癫痫', id1: 'QA013', id2: 'QA014'}, {name: '胰腺疾病', id1: 'QA015', id2: 'QA016'}, {name: '急慢性肾炎', id1: 'QA017', id2: 'QA018'}, {name: '急慢性肝炎', id1: 'QA019', id2: 'QA020'}, {name: '结缔组织疾病', id1: 'QA021', id2: 'QA022'}, {name: '糖尿病', id1: 'QA023', id2: 'QA024'}, {name: '甲亢', id1: 'QA025', id2: 'QA026'}, {name: '神经官能症', id1: 'QA027', id2: 'QA028'}, {name: '吸毒史', id1: 'QA029', id2: 'QA030'}, {name: '严重消化系统疾病', id1: 'QA031', id2: 'QA032'}, {name: '结核病', id1: 'QA033', id2: 'QA034'}, {name: '性病', id1: 'QA035', id2: 'QA036'}, {name: '恶性肿瘤', id1: 'QA037', id2: 'QA038'}, {name: '手术史', id1: 'QA039', id2: 'QA040'},{name: '严重外伤史', id1: 'QA041', id2: 'QA042'},{name: '其他', id1: 'QA043', id2: 'QA044'}]


  if(gyFlag=='1'){
		isGy = true;
	}else{
	    isGy = false; // 是否改约	
	}
    var lastDate; // 改约前日期
    var djtsxx; // 登记提示信息 是否需要人带
	function init(basePath,yyid00,index,code) {
		$('#mainDiv22').hide();
    	$('#topDIV').hide();
		basePath1 = basePath;
		index1 = index;
		code1 = code;
		var tjh000 = $('#tjh000').val();
		var choose = $('#choose').val();
		var lastChoose = $('#lastChoose').val();
		var zjbh00 = $('#zjbh00').val();
		var ifUpdate = $('#ifUpdate').val();
		if (lastChoose == '') {
			$('.steps li:eq(1)').hide();
			$('.wizard ul li').css('width','20%');
			$('.steps li:eq(2)').attr("class","active").html('<span class="step">2</span>订单选择<span class="chevron">');
			$('.steps li:eq(3)').html('<span class="step">3</span>体检缴费<span class="chevron">');
	        $('.steps li:eq(4)').html('<span class="step">4</span>体检日期预约<span class="chevron">');
	        $('.steps li:eq(5)').html('<span class="step">5</span>体检签到<span class="chevron">');
		}
		
		var KDRQ00;
		var tjxm;
		if(tjh000 == ""){
		tjzxx();
		} else if(ifUpdate == "1"){	
			tjzxx(tjh000);
		} else {
			var xm0000 = encodeURI(encodeURI($('#xm0000').val()));
			var mz0000 = $('#mz0000').val();
			var xb0000 = $('#xb0000').val();
			var dhhm00 = $('#dhhm00').val();
			var choose = $('#choose').val();
			var hyzk00 = $('#hyzk00').val();
			var nl0000 = $('#nl0000').val();			
			var whcd00 = $('#whcd00').val();
			var zylb00 = $('#zylb00').val();
			var bmi = $('#bmi').val();
			var yyid00 = $('#yyid00').val();
			var url = 'service/wjjm/tjzxx.htm?zjbh00=' + zjbh00 + '&xm0000='
					+ xm0000 + '&dhhm00=' + dhhm00 + '&xb0000=' + xb0000
					+ '&choose=' + choose + '&nl0000=' + nl0000 + '&mz0000='
					+ mz0000 + '&whcd00=' + whcd00 + '&zylb00=' + zylb00
					+ '&hyzk00=' + hyzk00 + '&bmi=' + bmi + '&yyid00=' + yyid00;
			$.ajax({
	            async : false,
	            cache : false,
	            dataType : 'json',
	            type: 'post',
	            contentType:"application/json;charset=UTF-8",
	            url : url,//请求的action路径
	            success :function(data) {
			
			var data1 = data.responseEntity.entity;
			if (data.responseEntity.errorcode === '98') {
			
			} else {
				for (var i = 0; i < data1.length; i++) {
			   if (data1[i].TJH000 === tjh000) {
			  	questiontjlxid  = data1[i].TJLXID
				}
			}
			}
			console.log(questiontjlxid)
			 
	                // 拼凑信息界面 
	               
	            }
	        });
			$('#fhButton').hide();
			$('#nButton').hide();			
			$('#infoDiv').hide();// 隐藏图片快
			$('#blockDiv').hide();// 隐藏图片快
			var url = 'service/wjjm/GetPEItem.htm?tjh000=' + tjh000;
			tjh = tjh000;
			ydj000= $('#ydj000').val();
			tjyyrq= $('#tjyyrq').val();
			// 项目表格
			$.ajax({
	            async : true,
	            cache : false,
	            dataType : 'json',
	            type: 'post',
	            contentType:"application/json;charset=UTF-8",
	            url : url,//请求的action路径
	            success :function(data) {
	            	
	            	var tsxe00 = $('#tsxe00').val();
	            	itemDatas = data.responseEntity.entity.rows;
	            	zfje00=data.responseEntity.entity.zfje00;
	            	dsje00=data.responseEntity.entity.dsje00;
	            	var ysje00=data.responseEntity.entity.ysje00;
	                searchTjxmDatas(itemDatas);
//	                var amount = getzongjia();
	        		$("#zfje00").html(zfje00);
	        		$("#dsje00").html(dsje00);
	        		$("#zongjia").show();
//	                if (tsxe00 != null && tsxe00 != "") {
//	                	if(dsje00 <= 0){
//	                	    if( tjyyrq=="") {
//	                	    $('#dsje00').css('color','');
//	                	    $('#nButton').removeClass('jfClass qdClass');
//	                		$('#nButton').addClass('yyClass');
//	           			 	$('#nButton').css("background","77EAA0");
//	           			 	$('#chinese').html('预约');
//	           			 	$('#english').html('make an appointment');	
//	           			 	$('.steps li:eq(2)').attr("class","complete");
//	    					$('.steps li:eq(3)').attr("class","complete");
//	    			        $('.steps li:eq(4)').attr("class","active").html('<span class="step">5</span>体检日期预约<span class="chevron">');
//	                	  }else{
//	                		    $('#dsje00').css('color','');
//	                		    $('#nButton').removeClass('yyClass jfClass');
//	                		    $('#nButton').addClass('qdClass');
//		    					$('#nButton').css("background","#D256A5");
//		    					$('#chinese').html('签到');
//		    					$('#english').html('sign in');	
//		    					$('.steps li:eq(2)').attr("class","complete");
//		    					$('.steps li:eq(3)').attr("class","complete");
//		    					$('.steps li:eq(4)').attr("class","complete");
//		    			        $('.steps li:eq(5)').attr("class","active"); 
//	                	 }
//	                	} else {
//	                		$('#nButton').removeClass('yyClass qdClass');
//	                		$('#nButton').addClass('jfClass');
//	           			 	$('#nButton').css("background","D29356");
//	           			 	$('#chinese').html('缴费');
//	           			 	$('#english').html('pay');
//	           			 	$('.steps li:eq(2)').attr("class","complete");
//	    			        $('.steps li:eq(3)').attr("class","active");
//	                	}
//	                }else 
//	                	if(choose!='7'&&dsje00<=0){
//	                	$('#nButton').removeClass('jfClass qdClass');
//	                	$('#nButton').addClass('yyClass');
//    					$('#nButton').css("background","77EAA0");
//    					$('#chinese').html('预约');
//    					$('#english').html('make an appointment');
//    					$('.steps li:eq(2)').attr("class","complete");
//    					$('.steps li:eq(3)').attr("class","complete");
//    			        $('.steps li:eq(4)').attr("class","active").text('体检日期预约');
//	                }else {
//	        			switch (choose) {
//	    				case '9':// 缴费
//	    					$('#dsje00').css('color','red');
//	    					$('#nButton').removeClass('yyClass qdClass');
//	    					$('#nButton').addClass('jfClass');
//	    					$('#nButton').css("background","D29356");
//	    					$('#chinese').html('缴费');
//	    					$('#english').html('pay');	
//	    					$('.steps li:eq(2)').attr("class","complete");
//	    			        $('.steps li:eq(3)').attr("class","active");
//	    					break;
//	    				case '8': // 预约
//	    					$('#dsje00').css('color','');
//	    					$('#nButton').removeClass('yyClass qdClass');
//	    					$('#nButton').addClass('yyClass');
//	    					$('#nButton').css("background","77EAA0");
//	    					$('#chinese').html('预约');
//	    					$('#english').html('make an appointment');
//	    					$('.steps li:eq(2)').attr("class","complete");
//	    					$('.steps li:eq(3)').attr("class","complete");
//	    			        $('.steps li:eq(4)').attr("class","active").text('体检日期预约');
//	    					break;
//	    				default: // 签到
//	    					$('#dsje00').css('color','');
//	    				 	$('#nButton').removeClass('jfClass yyClass');
//	    					$('#nButton').addClass('qdClass');
//	    					$('#nButton').css("background","#D256A5");
//	    					$('#chinese').html('签到');
//	    					$('#english').html('sign in');	
//	    					$('.steps li:eq(2)').attr("class","complete");
//	    					$('.steps li:eq(3)').attr("class","complete");
//	    					$('.steps li:eq(4)').attr("class","complete");
//	    			        $('.steps li:eq(5)').attr("class","active");
//	    					break;
//	        			}
//	                };
	        		if(dsje00 > 0){
	        			$('#dsje00').css('color','red');
    					$('#nButton').removeClass('yyClass qdClass');
    					$('#nButton').addClass('jfClass');
    					$('#nButton').css("background","D29356");
    					$('#chinese').html('缴费');
    					$('#english').html('pay');	
    					$('.steps li:eq(2)').attr("class","complete");
    			        $('.steps li:eq(3)').attr("class","active");	
	        		}else if(dsje00 <=0 &&(tjyyrq=="undefined" || tjyyrq == "")){
	        			$('#dsje00').css('color','');
    					$('#nButton').removeClass('yyClass qdClass');
    					$('#nButton').addClass('yyClass');
    					$('#nButton').css("background","77EAA0");
    					$('#chinese').html('预约');
    					$('#english').html('make an appointment');
    					$('.steps li:eq(2)').attr("class","complete");
    					$('.steps li:eq(3)').attr("class","complete");
    			        $('.steps li:eq(4)').attr("class","active").text('体检日期预约');
	        		}else if(dsje00 <=0 &&tjyyrq!= undefined){
	        			$('#dsje00').css('color','');
    				 	$('#nButton').removeClass('jfClass yyClass');
    					$('#nButton').addClass('qdClass');
    					$('#nButton').css("background","#D256A5");
    					$('#gyButton').show();	// 可改约
    					$('#chinese').html('签到');
    					$('#english').html('sign in');	
    					$('.steps li:eq(2)').attr("class","complete");
    					$('.steps li:eq(3)').attr("class","complete");
    					$('.steps li:eq(4)').attr("class","complete");
    			        $('.steps li:eq(5)').attr("class","active");
	        		}
	        		
	                $('#nButton').show();
	            }
	        });	}
		
		// 体检者信息 
		function tjzxx(tjh000) {
			var zjbh00;
			if (tjh000 == null || tjh000 == undefined){
				zjbh00 = $('#zjbh00').val();
			}else{
				zjbh00 = tjh000;
			}			 
			var xm0000 = encodeURI(encodeURI($('#xm0000').val()));
			var mz0000 = $('#mz0000').val();
			var xb0000 = $('#xb0000').val();
			var dhhm00 = $('#dhhm00').val();
			var choose = $('#choose').val();
			var hyzk00 = $('#hyzk00').val();
			var nl0000 = $('#nl0000').val();			
			var whcd00 = $('#whcd00').val();
			var zylb00 = $('#zylb00').val();
			var bmi = $('#bmi').val();
			var yyid00 = $('#yyid00').val();
			var url = 'service/wjjm/tjzxx.htm?zjbh00=' + zjbh00 + '&xm0000='
					+ xm0000 + '&dhhm00=' + dhhm00 + '&xb0000=' + xb0000
					+ '&choose=' + choose + '&nl0000=' + nl0000 + '&mz0000='
					+ mz0000 + '&whcd00=' + whcd00 + '&zylb00=' + zylb00
					+ '&hyzk00=' + hyzk00 + '&bmi=' + bmi + '&yyid00=' + yyid00;
			$('#topDIV2').hide();
			$('#blockDiv').show();
			$('#tjxmDiv').hide();
			$("#zongjia").hide();
			// 导航栏进度变更
			$('.steps li:eq(2)').attr("class","active");
			$('.steps li:eq(3)').attr("class","");
			$('.steps li:eq(4)').attr("class","");
			$('.steps li:eq(5)').attr("class","");
			$('.steps li:eq(6)').attr("class","");
			//卡片样式
			$.ajax({
	            async : true,
	            cache : false,
	            dataType : 'json',
	            type: 'post',
	            contentType:"application/json;charset=UTF-8",
	            url : url,//请求的action路径
	            success :function(data) {
	                // 拼凑信息界面 
	                addInfo(data.responseEntity);
	            }
	        });
			
			//卡片形式拼接
			function addInfo(data) {
				var list = data.entity;
				var jy=[];
				$('#infoDiv').show();
			   	var dom = [];
			   	if (data.errorcode == '00') {
			   		for (var i = 0;i < list.length; i++) {
			   			var gybs = 0; // 改约标识
			   			if (choose == '16') {
			   				if (list[i].JYCZWC == '1') {
			   					$('.steps li:eq(2)').attr("class","complete");
			   					$('.steps li:eq(3)').attr("class","complete");
			   					$('.steps li:eq(4)').attr("class","complete");
			   					$('.steps li:eq(5)').attr("class","complete");
			   					$('.steps li:eq(6)').attr("class","complete");
			   					jy = list[i].JYCZWC;
			   					var sfsf = list[i].SFSF00 == 1 ? '<span style="color:#00AA00;font-size:20px;">已缴费</span>' : '<span style="color:red;font-size:20px;">未缴费</span>';
					   			tjyyrq = list[i].TJYYRQ == undefined ? '<span style="color:red;font-size:20px;">未预约</span>': '<span style="color:#00AA00;font-size:20px;">'+list[i].TJYYRQ+'</span>';
					   			var djrqsj = list[i].DJRQSJ == undefined ? '未登记' : list[i].DJRQSJ.split(' ')[0];
					   			var title = "";
					   			
					   			if (list[i].TTMC00 == undefined) {
					   				title = "个人订单";
					   			} else if (list[i].TTMC00 != undefined && list[i].KDLX00 == 0) {
					   				title = "团体个性化";
					   			} else {
					   				title = "团体套餐";
					   			}
					   			dom.push('<div class="divBlock" onclick="yy.qh(\''+ list[i].TJH000 +'\',\''+ list[i].TJYYRQ +'\')"><div class="titleTable"></div>'
					   					+'<div class="iconTable"></div>'
					   					+'<table class="infoTable"><tbody><tr><td>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名</td><td>'+ list[i].XM0000 +'</td></tr>'
					   					+'<tr><td>体&nbsp;检&nbsp;号</td><td>'+ list[i].TJH000 +'</td></tr>'
					   					+'<tr><td>体检类型</td><td>'+ list[i].TJLXMC +'</td></tr>'
					   					+'<tr><td>登记日期</td><td>'+ djrqsj +'</td></tr>'
					   					+'<tr><td>缴费情况</td><td>'+ sfsf +'</td></tr>'
					   					+'<tr><td>预约日期</td><td>'+ tjyyrq +'</td></tr></tbody></table></div>');
			   				} 
			   			} else {
				   			var sfsf = list[i].SFSF00 == 1 ? '<span style="color:#00AA00;font-size:20px;">已缴费</span>' : '<span style="color:red;font-size:20px;">未缴费</span>';
				   			tjyyrq = list[i].TJYYRQ == undefined ? '<span style="color:red;font-size:20px;">未预约</span>': '<span style="color:#00AA00;font-size:20px;">'+list[i].TJYYRQ+'</span>';
				   			var tjqdrq = list[i].YDJ000 == undefined ? '<span style="color:red;font-size:20px;">未签到</span>': '<span style="color:#00AA00;font-size:20px;">已签到</span>';
				   			var djrqsj = list[i].DJRQSJ == undefined ? '未登记' : list[i].DJRQSJ.split(' ')[0];
				   			var title = "";
				   			var title1 = "";
				   			if (list[i].TTMC00 == undefined) {
				   				title = "个人订单";
				   				title1 ="个人订单";
				   			} else if (list[i].TTMC00 != undefined && list[i].KDLX00 == 0) {
				   				title = "团体个性化";
				   				title1 = "";
				   			} else {
				   				title = "团体套餐";
				   				title1 = "";
				   			}
				   			var kdxms0 = list[i].KDXMS0;
				   			var tsxe00 = list[i].TSXE00;
				   			if(kdxms0 > 0){
				   				tsxe00 = '***';
				   			}
				   			if (list[i].SFSF00 == 1 && list[i].TJYYRQ != undefined) {
				   				title += '<span style="color:red;font-size:18px;line-height:10px;">(可改约)</span>';
				   				gybs = 1;
				   				lastDate = list[i].TJYYRQ;
				   			}
				   			if (title1 == "个人订单"&& djrqsj == '未登记') {
				   				
				   			} else {
				   				dom.push('<div class="divBlock" onclick="yy.chooseTc(\''+list[i].TTID00+'\',\''+ list[i].TJH000 +'\',\''+ list[i].SFSF00 + '\',\''+ list[i].TJYYRQ +'\',\''+ list[i].TJLXID +'\',\''+ list[i].LXID00 +'\',\''+ list[i].TTBM00 +'\',\''+ list[i].ZYLXID +'\',\''+ list[i].FZID00 +'\',\''+ list[i].YDJ000 + '\',\''+ gybs + '\',\''+list[i].KDXMS0+'\',\''+ list[i].TSXE00 + '\',\''+ title1 + '\',\''+ list[i].DJTSXX + '\')"><div class="titleTable">'+ title +'</div>'
					   					+'<div class="iconTable"></div>'
					   					+'<table class="infoTable"><tbody><tr><td>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名</td><td>'+ list[i].XM0000 +'</td></tr>'
					   					+'<tr><td>体&nbsp;检&nbsp;号</td><td>'+ list[i].TJH000 +'</td></tr>'
					   					+'<tr><td>体检类型</td><td>'+ list[i].TJLXMC +'</td></tr>'
					   					+'<tr><td>登记日期</td><td>'+ djrqsj +'</td></tr>'
					   					+'<tr><td>缴费情况</td><td>'+ sfsf +'</td></tr>'
					   					+'<tr><td>预约日期</td><td>'+ tjyyrq +'</td></tr></tbody></table></div>');
				   			}
			   			}
			   		}
			   		if (jy.length == 0 && choose == "16") {
		   				bootbox.alert({
							   message : "<font face=\"verdana\" style='color:#46529E;font-size:20px;'>" + '您当前无未抽血项目，无需取号。' + "</font>",
							   buttons: {  
					               ok: {  
					                    label: '返回首页',  
					                    className: 'btn-default'  
					                }  
					            },
					            callback: function() {  
					            	window.location.href = basePath+"&index="+index+"&code="+code;
					            },
					            title: "提示"
						   });
		   				backFirst();
		   			}
			   		$('#infoDiv').html(dom);
			   	} else {
			   		bootbox.alert({
						   message : "<font face=\"verdana\" style='color:#46529E;font-size:20px;'>" + data.message + "</font>",
						   buttons: {  
				               ok: {  
				                    label: '返回首页',  
				                    className: 'btn-default'  
				                }  
				            },
				            callback: function() {  
				            	window.location.href = basePath+"&index="+index+"&code="+code;
				            },
				            title: "提示"
					   });
			   		backFirst();
			   	}
			}

		}
		//新增项目
		$('#xzjcxmButton').click(function() {
	    	getFl();
	    });
		function getFl() {
	    	$('#xzjcxm-table').bootstrapTable('destroy');
	    	$('#myModal').css("margin", "0 auto");
	        $('#myModal').css("width", "80%");
	        $('#myModal').css("height", "100%");
	        $('#addJcxmButton').show();
	        $('#zj').hide();
	        $('#search').hide();
	        $('.search').val('');
	        $('#back').hide();
	        xzfl00 = '';
	        isEncode = false;
	        $('#cancel font').text('关闭');
	        $('#modelTitle').text("选择分类");
	        test();
	        $('#xzfl').show(zxflData);
	        if (zxflData.length > 0) { // 全局数据，减少多次调用后台
	        	showXzfl(zxflData);
	        } else {
	        	$.ajax({
	        		type: "post",
	        		url: 'service/wjjm/getXzfl.htm?yyid00=' + yyid00,
	        		dataType: "json",
	        		success: function(data) {
	        			zxflData = data.stringList;
	        			if (zxflData.length > 0) {
	        				showXzfl(zxflData);
	        			} else {
	        				$('#modelTitle').text("新增检查项目");
	        				searchAddDatas();
	        			}
	        		}
	        	});        	            	
	        }
	    }
		function showXzfl(data) {
	    	var result = '<div class="xzfl">';
	    	for (var i = 0; i < data.length; i++) {
	    		 var tjtcDiv = '<div class= "flList">'+ data[i] +''
	    				+ '</div>';
	    	     result = result + tjtcDiv;
			}
	    	result = result + '</div>';
	    	$('#xzfl').html(result);
	    }
		 $(document).on('click',".flList",function(e) {
		    	xzfl00 = $(this).html();
		    	$('#xzfl').hide();
		    	$('#search').show();
		        searchAddDatas();
		        $('#zj').show();
		        $('#back').show();
		        $('#modelTitle').text("新增检查项目");
		        $('#tjxmzj').text('新增项目预估价');
		    });
		 $('#back').click(function() {
		    	getFl();
		 })
		function searchAddDatas() { //新增
	    	if (zxflData.length > 0) {
	    		if (isEncode) {
	    			xzfl00 = xzfl00;         			
	    		} else {
	    			xzfl00 = encodeURI(encodeURI(xzfl00));  
	    			isEncode = true;
	    		}
	    	} else {
	    		xzfl00 = 1;
	    	}
	    	var url = 'service/wjjm/getAddItemList.htm?yyid00=' + yyid00 + '&xzfl00=' + xzfl00;
	    	$('#search').show();
	    	$('#xzjcxm-table').bootstrapTable('destroy');
	        $('#xzjcxm-table').bootstrapTable({
	            classes: 'table-condensed',
	            height: 450,
	            //请求方法
	            method: 'get',
	            //是否显示行间隔色
	            striped: false,
	            //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）     
	            cache: true,
	            //是否显示分页（*）  
	            pagination: true,
	            //是否启用排序  
	            sortable: true,
	            //排序方式 
	            sortOrder: "asc",
	            dataField: 'rows',
	            contentType: 'application/json',
	            dataType: 'json',
	            //初始化加载第一页，默认第一页
	            pageNumber: 1,
	            //每页的记录行数（*）   
	            pageSize: 6,
	            // 查询参数,每次调用是会带上这个参数，可自定义                         
	            queryParams: function(params) {
	                var xb0000 = $('#xb0000').val();
	                var temp = { //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的  
	                    pageSize: params.pageSize,
	                    //页面大小  
	                    pageNumber: params.pageNumber,
	                    //页码 
	                    xb0000: xb0000,
	                    sqxmid: getSqxmid(),
	                    search: $(".search").val().toLowerCase()
	                };
	                return temp;
	            },
	            //可供选择的每页的行数（*）    
	            pageList: [11, 22, 52, 100],
	            //这个接口需要处理bootstrap table传递的固定参数,并返回特定格式的json数据  
	            url: url,
	            // 默认值为 'limit',传给服务端的参数为：limit, offset, search, sort, order Else
	            queryParamsType: "offset",
	            clickToSelect: true,
	            //分页方式：client客户端分页，server服务端分页（*）
	            sidePagination: "server",
	            // 隐藏单选头
				checkboxHeader: false,
				maintainSelected: true,
	            // 是否显示搜索
	            search: false,
	            paginationHAlign: "left",
	            paginationVAlign: 'bottom',
	            //bottom, top, both
	            paginationPreText: '上一页',
	            //分页
	            paginationNextText: '下一页',
	            strictSearch: false,
	            idField: "SQXMID",
	            responseHandler: function(res) {            	 
	            	 $.each(res.responseEntity.entity, function (i, row) {  
			              row.checkStatus = $.inArray(row.SQXMID, selectionIds) != -1;  //判断当前行的数据id是否存在与选中的数组，存在则将多选框状态变为true  
			          });  
			          return {
		   				 "rows": res.responseEntity.entity,
		   				 "total": res.responseEntity.total
	           		};
		        },
	            formatLoadingMessage: function() {
	                return "请稍等，正在加载中...";
	            },
	            formatNoMatches: function() { // 没有匹配的结果
	                return "无符合条件的记录";
	            },
	            rowStyle: function rowStyle(row, index) {
	                return {
	                    css: {
	                        "white-space": "nowrap",
	                        "margin": "none",
	                        "height": "40px",
	                        "line-height": "40px",
	                        "font-size": "20px"
	                    }
	                };
	            },
	            cellStyle: function cellStyle(value, row, index) {
	                return {
	                    css: {
	                        "white-space": "nowrap",
	                        "border": "none",
	                        "height": "30px"
	                    }
	                };
	            },
	            onLoadSuccess: function(data) { // 加载成功时执行
	            	dataLength = data.total;
	            	dataLength <= 6 ? $('.search').css("margin-top",'20') : $('.search').css("margin-top",'-65px');
	            },
	            onLoadError: function(data) { // 加载失败时执行
	            },
	            columns: [{
	                field: 'checkStatus',
	                checkbox: true,
	                align: 'center'
	            }, {
	                field: 'SQXMID',
	                title: '项目id',
	                align: 'center',
	                visible: false
	            }, {
	                field: 'SFXMMC',
	                title: '项目名称',
	                align: 'center',
	                width: '200'
	            }, {
	                field: 'PYSM00',
	                title: '项目编码',
	                align: 'center',
	                width: '200',
	                visible: false
	            }, {
	                field: 'DJ0000',
	                title: '参考价格',
	                align: 'center',
	                width: '50',
	                sortable: false,
	                formatter: function(value, row, index) {
	                    examItem(row, index);
	                    return value;
	                }
	            }, {
	                field: 'BMMC00',
	                title: '所属科室',
	                align: 'center',
	                width: '50',
	                sortable: false
	            }, {
	                field: 'JSXX00',
	                title: '注意事项',
	                align: 'center',
	                width: '50',
	                visible: false
	            }]
	        });
	    }
	    
	    function getSqxmid() {
	        var allTableData = $('#tcxm-table').bootstrapTable('getData'); // 获取表格的所有内容行
	        var sqxmid = "";
	        for (var i = 0; i < allTableData.length; i++) {
	            var xmid = allTableData[i].SQXMID;
	            if (sqxmid != "" && sqxmid != null) {
	                sqxmid = sqxmid + "," + allTableData[i].SQXMID;
	            } else {
	                sqxmid = allTableData[i].SQXMID;
	            }
	        }
	        return sqxmid;
	    }
	    var xmCode = [];
	    function examItem(row, index) {
	        xmCode.push(row);
	    }
	    function test() {
	        var zongjia = 0;
	        if (selected.length == 0) {
	            $('#zongjia1').text(zongjia);
	        } else if (selected.length > 0) {
	            for (var i = 0; i < selected.length; i++) {
	                zongjia = parseFloat(zongjia) + parseFloat(selected[i].DJ0000);
	            }
	            zongjia = zongjia + '';
	            if (zongjia.indexOf(".") > 0) {
	                zongjia = zongjia.substring(0, zongjia.indexOf(".") + 3);
	            }
	            $('#zongjia1').text(zongjia);
	        }
	    }
		/* 获取项目 */
		function searchTjxmDatas(itemDatas) {
			$('#tjxm-table').show();
			$('#topDIV2').show();
//			var amount = getzongjia();
//			$("#amount").html(amount);
			$("#zongjia").show();
			
			$('#tjxm-table').bootstrapTable('destroy');
			$('#tjxm-table').bootstrapTable({
				classes : 'table-condensed',
				height : 730,
				//请求方法
				method : 'post',
				//是否显示行间隔色
				striped : false,
				//是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）     
				cache : true,
				data : itemDatas,
				//是否显示分页（*）  
				pagination : true,
				//是否启用排序  
				sortable : true,
				//排序方式 
				sortOrder : "asc",
				dataField : 'rows',
				contentType : 'application/json',
				dataType : 'json',
				//初始化加载第一页，默认第一页
				//我设置了这一项，但是貌似没起作用，而且我这默认是0,- -
				pageNumber : 1,
				//每页的记录行数（*）   
				pageSize : 11,
				queryParamsType : "limit",
				//可供选择的每页的行数（*）    
				pageList : [ 11, 22, 52, 100 ],
				//这个接口需要处理bootstrap table传递的固定参数,并返回特定格式的json数据  
				url : '',
				// 默认值为 'limit',传给服务端的参数为：limit, offset, search, sort, order Else
				queryParamsType : "undefined",
				// 查询参数,每次调用是会带上这个参数，可自定义                         
				queryParams : function(params) {
	            	var temp = { //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的  
	                        pageSize: params.pageSize,
	                        //页面大小  
	                        pageNumber: params.pageNumber
	                        //页码 
	                    };
	                    return temp;
	            },
				//分页方式：client客户端分页，server服务端分页（*）
				sidePagination : "client",
				paginationPreText: '上一页',
	            // 分页
	            paginationNextText: '下一页',
				// 是否显示搜索
				search : false,
				paginationHAlign : "left",
				paginationVAlign : 'bottom', //bottom, top, both
				strictSearch : false,
				// idField : "SQXMID",
				formatLoadingMessage : function() {
					return "请稍等，正在加载中...";
				},
				formatNoMatches : function() { //没有匹配的结果  
					return "无符合条件的记录";
				},
				rowStyle : function rowStyle(row, index) {
					return {
						css : {
							"white-space" : "nowrap",
							"margin" : "none",
							"height": "40px",
                            "line-height": "40px",
                            "font-size": "20px"
						}
					};
				},
				cellStyle : function cellStyle(value, row, index) {
					return {
						css : {
							"white-space" : "nowrap",
							"border" : "none",
							"height" : "30px"
						}
					};
				},
				onLoadSuccess : function(data) { //加载成功时执行  
					var data = $('#tjxm-table').bootstrapTable('getData');
				},
				onLoadError : function(data) { //加载失败时执行  

				},
				responseHandler:function(res) {
					tjxm = res.rows;
					return {
						"rows": tjxm
             		};
				},
				columns : [{
					field : 'SFXMMC',
					title : '项目名称',
					align : 'center',
					width : '400',
				}, {
					field : 'ZFJE00',
					title : '自费金额（元）',
					align : 'center',
					width : '100',
		      	}]
			});
		}
		
		var xm0000 = encodeURI(encodeURI($('#xm0000').val()));
		var mz0000 = $('#mz0000').val();
		var whcd00 = $('#whcd00').val();
		var zylb00 =$('#zylb00').val() ;
		var dhhm00 = $('#dhhm00').val();
		/* 预约时间列表 */
		$(document).on('click',".yyClass",function(){ 
			$('#zongjia').hide();
                var url = 'service/wjjm/getYysj.htm?tjh000=' + tjh+ '&yyid00=' + yyid00 + '&zjbh00=' +zjbh00 + '&xm0000=' + xm0000 + '&dhhm00=' + dhhm00;
                $.ajax({
                    cache : false,
                    dataType : 'json',
                    type: 'post',
                    contentType: "application/json;charset=UTF-8",
                    url : url,//请求的action路径
                    success :function(data) {
                        // 拼凑预约时间界面
                        yyInfo(data.responseEntity);
                        $('#tjxm-table').hide();
                    }
                })
		});
		
		//预约时间卡片形式
		function yyInfo(data) {
			$('#tjxmDiv').hide();
			$('#topDIV2').hide();
			var list = data.entity;
			
			$('#infoText').hide();
			$('#infoDiv').show();
		   	var dom = [];
		   	if (data.errorcode == '00') {
		   		if(list.length <= 0) {
		   			bootbox.alert({
						title: "提示",
						message : "<font face=\"verdana\" style='color:#46529E;font-size:20px;'>体检中心已被约满，当前无可预约号源。</font>",
					    buttons: {  
			               ok: {  
			                    label: '<font style="color:#337AB7">确定</font>',  
			                    className: 'btn-default'  
			                }  
			            },
			            callback: function() {  
			            	$('#blockDiv').hide();
			            	$('#zongjia').show();
			            	$('#tjxm-table').show();
			            	$('#tjxmDiv').show();
			        		$('#topDIV2').show();
			        		$('#gyButton').hide();
			            }
				   })
		   		}
		   		for (var i = 0;i < list.length; i++) {
		   			var week = getDay(list[i].KDRQ00);
		   			var year = list[i].KDRQ00.substr(0,4);
					var month = list[i].KDRQ00.substr(4,2);
					var day = list[i].KDRQ00.substr(6,2);
					var date = year+'-'+month+'-'+day;
					if (lastDate == undefined) {
						if (list[i].SYYYL0 <= 0) {
							
						} else {
							
							dom.push('<div class="yyBlock" onclick="yy.yysj(\''+ tjh +'\',\''+ list[i].KDRQ00 + '\',\''+ basePath + '\')">'
									+'<div class="titleTable">' + week + '</div>'
									+'<div class="iconTable"></div>'
									+'<table class="yyTable"><tbody><tr><td>日期</td><td>'+ date +'</td></tr>'
									+'<tr><td>余量</td><td>'+ list[i].SYYYL0 +'</td></tr></tbody></table></div>');
						}
					} else if (lastDate != date) {// 改约 隐藏上次预约日期 并且数据不止1条
						if (list[i].SYYYL0 <= 0) {
							
						} else {

		
							dom.push('<div class="yyBlock" onclick="yy.yysj(\''+ tjh +'\',\''+ list[i].KDRQ00 + '\',\''+ basePath + '\')">'
									+'<div class="titleTable">' + week + '</div>'
									+'<div class="iconTable"></div>'
									+'<table class="yyTable"><tbody><tr><td>日期</td><td>'+ date +'</td></tr>'
									+'<tr><td>余量</td><td>'+ list[i].SYYYL0 +'</td></tr></tbody></table></div>');	
						}					
					}
		   		}
		   		if (dom.length <= 0) {
		   			bootbox.alert({
						   message : "<font size= \"6\" face=\"verdana\" style='color:#46529E;font-size:20px;'>体检中心已约满，当前无可预约号源？</font>",
						   buttons: {  
				               ok: {  
				                    label: '返回首页',  
				                    className: 'btn-default'  
				                }  
				            },
				            callback: function() {  
				            	window.location.href = basePath+"&index="+index+"&code="+code;
				            },
				            title: "提示"
					   });
		   			backFirst();
		   		} else {
		   			$('#infoDiv').html(dom);
		   			$('#blockDiv').show();
		   		}
		   	} else {
		   		bootbox.alert({
					   message : "<font size= \"6\" face=\"verdana\" style='color:#46529E;font-size:20px;'>" + data.message + "</font>",
					   buttons: {  
			               ok: {  
			                    label: '返回首页',  
			                    className: 'btn-default'  
			                }  
			            },
			            callback: function() {  
			            	window.location.href = basePath+"&index="+index+"&code="+code;
			            },
			            title: "提示"
				   });
		   		backFirst();
		   	}
		}
		
		// 返回星期几
		function getDay(date) {
			var year = date.substr(0,4);
			var month = date.substr(4,2);
			var day = date.substr(6,2);
			var week = year+'-'+month+'-'+day;
			var whatDay =  new Date(week).toDateString().substr(0,3);
			var text = "";
            switch (whatDay) {
                 case 'Sun':
                     text = "星期日";
                     break;
                 case 'Mon':
                     text = "星期一";
                     break;
                 case 'Tue':
                	 text = "星期二";
                     break;
                 case 'Wed':
                     text = "星期三";
                     break;
                 case 'Thu':
                     text = "星期四";
                     break;
                 case 'Fri':
                     text = "星期五";
                     break;
                 case 'Sat':
                     text = "星期六";
                     break;
             	}
			       return text;
		}
		
		 /* 签到 */
		$(document).on('click',".qdClass",function() {
			qd(tjyyrq,tjh);
        });
		/* 缴费 */
		$(document).on('click',".jfClass",function(){ 
//			var amount = getzongjia();
			var xb0000 = $('#xb0000').val();
			window.location.href = 'jf.htm?tjh000=' + tjh
					+ '&yyid00=' + yyid00 + '&choose=' + choose
					+ '&amount=' + dsje00 + '&zjbh00=' + zjbh00
					+ '&xm0000=' + xm0000 + '&index=' + index
					+ "&code=" + code +'&ydj000='+ydj000 +'&xb0000='+ xb0000; //进入缴费界面
		});
				
		//返回体检信息
	   $('#fhButton').click(function() {
		   tjzxx();
		    $('#tjxm-table').bootstrapTable('destroy');
	   });
	   $('#fhButton1').click(function() {
			if (alter) {
	    		var msg = "<font size='5' face='verdana' style='color:#46529E;font-size:20px;'>&nbsp&nbsp&nbsp返回后当前操作不保留，是否确定？</font>";
	    		bootbox.confirm({
	                buttons: {
	                    confirm: {
	                        label: '取消',
	                        className: 'btn-default'
	                    },
	                    cancel: {
	                        label: '确定',
	                        className: 'btn-primary'
	                    }
	                },
	                title: "提示",
	                message: msg,
	                callback: function(r) {
	                    if (!r) {
	                    	 $('#mainDiv22').hide();
	                    	 tjzxx();
	            		     $('#tjxm-table').bootstrapTable('destroy');	
	                         $('#topDIV').hide();		
	                         $('.steps li:eq(2)').attr("class","active");
	                     	 $('.steps li:eq(3)').attr("class","");
	                     	 alter = false;
	                    }
	                }
	                
	            })
	    	} else {
	    		 $('#mainDiv22').hide();
          	 	 tjzxx();
  		     	 $('#tjxm-table').bootstrapTable('destroy');
	             $('#topDIV').hide();		
	             $('.steps li:eq(2)').attr("class","active");
	         	 $('.steps li:eq(3)').attr("class","");
	             alter = false;
	    	}
		});
	   // 改约 获取预约时间列表
	   $("#gyButton").click(function() {
		   $('#zongjia').hide();
		   var url = 'service/wjjm/getYysj.htm?tjh000=' + tjh+ '&yyid00=' + yyid00 + '&zjbh00=' + zjbh00 + '&xm0000=' + xm0000 + '&dhhm00=' + dhhm00;
	       $.ajax({
	    	   cache : false,
               dataType : 'json',
               type: 'post',
               contentType: "application/json;charset=UTF-8",
               url : url,//请求的action路径
               success :function(data) {
                   // 拼凑预约时间界面 
               	yyInfo(data.responseEntity);
               	$('#tjxm-table').hide();
               }
	       	})
	   });
		
		// 返回首页 
	    $('#returnIndex').click(function() {
	    	bootbox.confirm({
                buttons: {
                    confirm: {
                        label: '取消',
                        className: 'btn-default'
                    },
                    cancel: {
                        label: '确定',
                        className: 'btn-primary'
                    }
                },
                title: "提示",
                message: '<font size=\"4\" face=\"verdana\" style=\"color:#46529E\">&nbsp&nbsp&nbsp确定是否返回首页？</font>',
                callback: function(r) {
                    if (!r) {
                    	window.location.href = basePath + "&index=" + index + "&code=" + code;
                    } else {
                    	this.hide();
                    }
                }
            });
	    });
		
		function queryAddParams(params) { //配置参数  
			var temp = { //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的  
				search : params.searchText
			};
			return temp;
		}
		
//		//总金额
//		function getzongjia() {
//		    var zongjia = 0;
//		    var allTableData = $('#tjxm-table').bootstrapTable('getData');//获取表格的所有内容行  
//		    console.log(allTableData);
//	        var flag = false;  
//	        for( var i = 0; i < allTableData.length; i++) {
//	        	
//	        	zongjia = parseFloat(zongjia) + parseFloat(allTableData[i].ZFJE00);                             
//	        }  
//	        zongjia = zongjia + '';
//	        if(zongjia.indexOf(".") > 0) {
//	            zongjia = zongjia.substring(0,zongjia.indexOf(".") + 3);                      
//	        }        
//	        if (zongjia.length == 3) {
//	        	$('#zongjia').css("margin-right","27px");
//	        } else {
//	        	$('#zongjia').css("margin-right","40px");	        	
//	        }
//	        return zongjia;
//		}
	}
	
	function chooseTc(TTID00,TJH000,SFSF00,TJYYRQ,TJLXID,LXID00,TTBM00,ZYLXID,FZID00,YDJ000,GYBS00,KDXMS0,TSXE00,title,DJTSXX) {
		var tjlb00;
		questiontjlxid = TJLXID
		if(TTID00=='0'){
			tjlb00='1';
		}else{
			tjlb00='2';
		}
		if(TTBM00.toString()== "undefined"){
			TTBM00="";
		}else{
			TTBM00 = encodeURI(encodeURI(TTBM00));
		}
		if(ZYLXID.toString()== "undefined"){
			ZYLXID="";
		}
		if(FZID00.toString()== "undefined"){
			FZID00="";
		}
		if (GYBS00 == 1) {
			$("#gyButton").show();
			gyFlag='1';
			isGy = true;
		} else {
			$("#gyButton").hide();
		}
		tjyyrq = TJYYRQ;
		tjh = TJH000;		
		ydj000=YDJ000;
		$('#blockDiv').hide();
		if( title != "个人订单" && tjyyrq != "" ){
			$('#tjxmDiv').hide();
//			$('#topDIV2').hide();
		} else {
			$('#tjxmDiv').show();
//			$('#topDIV2').show();
		}	
		if (DJTSXX.toString() != "undefined") {
			djtsxx = DJTSXX;
		} else {
			djtsxx = '';
		}
		var zjbh00 = $('#zjbh00').val();
		var xm0000 = encodeURI(encodeURI($('#xm0000').val()));
		var dz0000 = encodeURI(encodeURI($('#dz0000').val()));
		var mz0000 = $('#mz0000').val();
		var xb0000 = $('#xb0000').val();
		var dhhm00 = $('#dhhm00').val();
		var hyzk00 = $('#hyzk00').val();
		var nl0000 = $('#nl0000').val();			
		var whcd00 = $('#whcd00').val();
		var zylb00 = $('#zylb00').val();
		
        var photo="";
        if(sessionStorage.getItem("photo")!=null){
        photo=sessionStorage.getItem("photo");	
        photo= encodeURIComponent(photo);
        }
        $(document).on('click',".jfClass",function(){ 
//			var amount = getzongjia();
			window.location.href = 'jf.htm?tjh000=' + tjh
					+ '&yyid00=' + yyid00 + '&choose=' + choose
					+ '&amount=' + dsje00 + '&zjbh00=' + zjbh00
					+ '&xm0000=' + xm0000 + '&index=' + index
					+ "&code=" + code +'&ydj000='+ydj000 +'&mz0000='+ mz0000 + '&xb0000='+xb0000 +'&dhhm00='+dhhm00 + '&hyzk00=' + hyzk00 + '&whcd00=' + whcd00 +'&zylb00='+zylb00+'&tjlxid='+TJLXID+'&lxid00='+LXID00+'&dept='+TTBM00+'&careerType='+ZYLXID+'&group='+FZID00+'&tjlb00='+tjlb00; //进入缴费界面
		});
		$.ajax({
            cache : false,
            dataType : 'json',
            type: 'post',
            contentType:"application/json;charset=UTF-8",
            url :'service/wjjm/updatePerson.htm?tjh000='+TJH000+'&xm0000='+xm0000+'&xb0000='+xb0000+'&zjbh00='+zjbh00+'&dhhm00='+dhhm00+'&hyzk00='+hyzk00+'&mz0000='+mz0000+'&whcd00='+whcd00+'&zylb00='+zylb00+'&yyid00='+yyid00+'&tjlxid='+TJLXID+'&lxid00='+LXID00+'&dept='+TTBM00+'&careerType='+ZYLXID+'&group='+FZID00+'&tjlb00='+tjlb00+'&dz0000='+dz0000+'&photo='+photo,//请求的action路径
            success :function(data) {
             if(data.errorcode=='00'){
         		var lastChoose = $('#lastChoose').val();
         		if( title != "个人订单"){
         			$('#dsje00').hide();
         			if(YDJ000 == '0') {
        	    		var url = 'service/wjjm/tjdj.htm?tjh000='+TJH000;
        	        	$.ajax({
        	                async : false,
        	                cache : false,
        	                dataType : 'json',
        	                type: 'post',
        	                contentType:"application/json;charset=UTF-8",
        	                url : url,//请求的action路径
        	                success :function(data) {            	                	
        	                    if (data.responseEntity.errorcode == "98") {
        	                    	bootbox.alert({
        	                    		title: "提示", 
        	     					   	message : "<font face=\"verdana\" style='color:#46529E;font-size:20px;'>" + data.responseEntity.message + "</font>",
        	     					   	buttons: {  
        	     					   		ok: {  
        	     			                    label: '<font style="color:#337AB7">确定</font>',  
        	     			                    className: 'btn-default'  
        	     			                }  
        	     			            }
        	     				   });
        	                    } else {
        	                    	SFSF00 = data.responseEntity.entity.sfsf00;
        	                    	getPEItem(TJH000,TJYYRQ,SFSF00,TSXE00,KDXMS0);
        	                    }
        	                }
        	            });
        	    	} else {
        	    		getPEItem(TJH000,TJYYRQ,SFSF00,TSXE00,KDXMS0);
        	    	} 
         		} else {
         			$('#dsje00').show();
	        		if(YDJ000 == '0') {// 登记
//	    	    		var url = 'service/wjjm/tjdj.htm?tjh000='+TJH000;
//	    	        	$.ajax({
//	    	                async : false,
//	    	                cache : false,
//	    	                dataType : 'json',
//	    	                type: 'post',
//	    	                contentType:"application/json;charset=UTF-8",
//	    	                url : url,//请求的action路径
//	    	                success :function(data) {            	                	
//	    	                    if (data.responseEntity.errorcode == "98") {
//	    	                    	bootbox.alert({
//	    	                    		title: "提示", 
//	    	     					   	message : "<font face=\"verdana\" style='color:#46529E;font-size:20px;'>" + data.responseEntity.message + "</font>",
//	    	     					   	buttons: {  
//	    	     					   		ok: {  
//	    	     			                    label: '<font style="color:#337AB7">确定</font>',  
//	    	     			                    className: 'btn-default'  
//	    	     			                }  
//	    	     			            }
//	    	     				   });
//	    	                    } 
//	    	                }
//	    	            });
//	        			$('#topDIV2').hide();
                		bootbox.alert({
   	                     buttons: {
   	                         ok: {
   	                             label: '返回',
   	                             className: 'btn-default'
   	                         }
   	                     },
   	                     message: "<font face=\"verdana\" style='color:#46529E;font-size:20px;'>此订单未登记，请咨询前台。</font>" ,
   	                     callback: function() {
   	                    	$('#blockDiv').show();
   	                     },
   	                     title: "提示"
   	                 });
	    	    	}else{
		        		if (SFSF00 == '0') {
					
		        			if ($('#dsje00').val() <= 0) {
		        				$('#dsje00').css('color','');
		        			}
		        			$('#dsje00').css('color','red');
		        			$('#nButton').removeClass('yyClass qdClass');
		        			$('#nButton').addClass('jfClass');
		        			$('#nButton').css("background","D29356");
		        			$('#chinese').html('缴费');
		        			$('#english').html('pay');
		        			$('.steps li:eq(2)').attr("class","complete");
		        			$('.steps li:eq(3)').attr("class","active");				
		        		} else if (SFSF00 == "1"&& TJYYRQ == "undefined") {
		        			$('#dsje00').css('color','');
		        			$('#nButton').removeClass('jfClass qdClass');
		        			$('#nButton').addClass('yyClass');
		        			$('#nButton').css("background","77EAA0");
		        			$('#chinese').html('预约');
		        			$('#english').html('make an appointment');
		        			$('.steps li:eq(2)').attr("class","complete");	
		        			if (lastChoose == '') {
		        				$('.steps li:eq(3)').attr("class","complete").html('<span class="step">3</span>体检缴费<span class="chevron">');	
		        				$('.steps li:eq(4)').attr("class","active").html('<span class="step">4</span>体检日期预约<span class="chevron">');	
		        			} else {
		        				$('.steps li:eq(3)').attr("class","complete");
		        				$('.steps li:eq(4)').attr("class","active").html('<span class="step">5</span>体检日期预约<span class="chevron">');				
		        			}
		        		} else if (SFSF00 == "1"&& TJYYRQ != "undefined"){
		        			$('#dsje00').css('color','');
		        			$('#nButton').removeClass('yyClass jfClass');
		        			$('#nButton').addClass('qdClass');
		        			questiontjlxid = TJLXID;
						questiontjh000 = TJH000;
		        			$('#nButton').css("background","#D256A5");
		        			$('#chinese').html('签到');
		        			$('#english').html('sign in');	
		        			$('.steps li:eq(2)').attr("class","complete");
		        			$('.steps li:eq(3)').attr("class","complete");
		        			$('.steps li:eq(4)').attr("class","complete");
		        	        $('.steps li:eq(5)').attr("class","active");
		        		}
		        			        		
		        		var url = 'service/wjjm/GetPEItem.htm?tjh000=' + TJH000;
		        		tjh = TJH000;
		        		$.ajax({
		                    cache : false,
		                    dataType : 'json',
		                    type: 'post',
		                    contentType:"application/json;charset=UTF-8",
		                    url : url,//请求的action路径
		                    success :function(data) {
		                    	if(data.responseEntity.errorcode == '98'){
		                    		bootbox.alert({
		        	                     buttons: {
		        	                         ok: {
		        	                             label: '返回',
		        	                             className: 'btn-default'
		        	                         }
		        	                     },
		        	                     message: "<font size=\"4\" face=\"verdana\" style='color:#46529E;font-size:20px;'>"
		             						+data.responseEntity.message+"<br/>(请于预约时间当天前往医院签到体检)</font>" ,
		        	                     callback: function() {
		        	                         window.history.back();
		        	                     },
		        	                     title: "提示"
		        	                 });
		                    	}
		                        itemDatas = data.responseEntity.entity.rows;
		                        searchTjxmDatas(itemDatas);
		                        if ($('.pagination').css('display') != 'none'){
		        					$('#zongjia').css('margin-top','-50px');
		        				} else {
		        					$('#zongjia').css('margin-top','0px');
		        				}
		                    	zfje00=data.responseEntity.entity.zfje00;
		                    	dsje00=data.responseEntity.entity.dsje00;
		                    	$("#zfje00").html(zfje00);
		                		$("#dsje00").html(dsje00);
		//                        var amount = getzongjia();
		//                		$("#amount").html(amount);
		                		$("#zongjia").show();
		                    }
		        		}); 	
	    	    	}

         		}
             }else{
            	$('#topDIV2').hide();
         		bootbox.alert({
                    buttons: {
                        ok: {
                            label: '返回首页',
                            className: 'btn-default'
                        }
                    },
                    message: "<font size=\"4\" face=\"verdana\" style='color:#46529E;font-size:20px;'>用户信息更新失败，请至前台处理。</font>" ,
                    callback: function() {
                    	window.location.href = basePath1 + "&index=" + index + "&code=" + code;
                    },
                     title: "提示"
                });
             };
            }

		});
	}
	 //选中事件操作数组  
    var union = function(array,ids,rows) {
    	selected.push(rows);
        $.each(ids, function (i, id) {  
            if($.inArray(id,array) == -1) {  
                array[array.length] = id;  
            }  
        });  
        return array;  
    }; 
    
    //取消选中事件操作数组  
    var difference = function(array,ids,rows) {
    	for (var i = 0 ;i < selected.length;i++) {
    		if (selected[i].SQXMID === rows.SQXMID) {
    			selected.splice(i,1);
    		}
    	} 
        $.each(ids, function (i, id) {  
             var index = $.inArray(id,array);  
             if(index != -1) {  
                 array.splice(index, 1);  
             }  
        });  
        return array;  
    };  
    var _ = {"union":union,"difference":difference}; 
    
    //绑定选中事件、取消事件、全部选中、全部取消  
    $('#xzjcxm-table').on('check.bs.table check-all.bs.table uncheck.bs.table uncheck-all.bs.table', function (e, rows) {  
    	var ids = $.map(!$.isArray(rows) ? [rows] : rows, function (row) {  
    		return row.SQXMID;  
        });  
        func = $.inArray(e.type, ['check', 'check-all']) > -1 ? 'union' : 'difference';  
        selectionIds = _[func](selectionIds, ids,rows);  
        test();
    });  
	
	function getPEItem(TJH000,TJYYRQ,SFSF00,TSXE00,KDXMS0) {
		tjh = TJH000;
		tsxe00 = TSXE00;		
		if (parseInt(KDXMS0) == 0 && SFSF00 == "1") {
	        var zjbh00 = $('#zjbh00').val();
	        var xm0000 = encodeURI(encodeURI($('#xm0000').val()));
	        var dz0000 = encodeURI(encodeURI($('#dz0000').val()));
	        var xb0000 = $('#xb0000').val();
	        var dhhm00 = $('#dhhm00').val();
	        var hyzk00 = $('#hyzk00').val();
	        var nl0000 = $('#nl0000').val();
	        var mz0000 = $('#mz0000').val();
	        var whcd00 = $('#whcd00').val();
	        var zylb00 = $('#zylb00').val();
	        var zjlx00 = $('#zjlx00').val();
	        var lastChoose = $('#choose').val();
//	        var choose = $('#choose').val();
			var href = 'mainTj.htm?zjbh00=' + zjbh00
					+ "&xm0000=" + xm0000 + "&xb0000="
					+ xb0000  + "&zjlx00="
					+ zjlx00 + "&yyid00=" + yyid00
					+ "&nl0000=" + nl0000 + "&hyzk00="
					+ hyzk00 + "&dhhm00=" + dhhm00
					+ "&tsxe00=" + TSXE00 + "&mz0000="
					+ mz0000+ "&dz0000="
					+ dz0000 + "&whcd00=" + whcd00
					+ "&zylb00=" + zylb00 + "&tjh000="
					+ TJH000 + "&index=" + index + "&code="
					+ code + "&lastChoose=" + lastChoose;
			
          choose = "6";
          window.location.href = href + "&choose=" + choose;
      }else{
    		$('#mainDiv').hide();
            $('#mainDiv22').show();
            $('#topDIV').show();
          var url = 'service/wjjm/GetPEItem.htm?tjh000=' + TJH000;
          $.ajax({
	            async : true,
	            cache : false,
	            dataType : 'json',
	            type: 'post',
	            contentType:"application/json;charset=UTF-8",
	            url : url,//请求的action路径
	            success :function(data) {
	            	itemDatas = data.responseEntity.entity.rows;
	                searchTjxmDatas1(itemDatas);	                 
	                getygj(TSXE00);
	                
	                if (SFSF00 == "0") {
	              	  if ($('#dsje00').val() <= 0) {
	          				$('#dsje00').css('color','');
	          			}
	          			$('#dsje00').css('color','red');
	          			$('#nButton').removeClass('yyClass qdClass');
	          			$('#nButton').addClass('jfClass');
	          			$('#nButton').css("background","D29356");
	          			$('#chinese').html('缴费');
	          			$('#english').html('pay');
	          			$('.steps li:eq(2)').attr("class","complete");
	          			$('.steps li:eq(3)').attr("class","active");

	              } else if (parseInt(KDXMS0) > 0 && SFSF00 == "1" &&TJYYRQ!="undefined") {
	              	$('#dsje00').css('color','');
	          		$('#nButton').removeClass('yyClass jfClass');
	          		$('#nButton').addClass('qdClass');
	          		$('#nButton').css("background","#D256A5");
	          		$('#chinese').html('签到');
	          		$('#english').html('sign in');	
	          		$('.steps li:eq(2)').attr("class","complete");
	          		$('.steps li:eq(3)').attr("class","complete");
	          		$('.steps li:eq(4)').attr("class","complete");
	                  $('.steps li:eq(5)').attr("class","active");
	              } else if (parseInt(KDXMS0) > 0 && SFSF00 == "1"&&TJYYRQ=="undefined") {
	              	$('#dsje00').css('color','');
	          		$('#nButton').removeClass('jfClass qdClass');
	          		$('#nButton').addClass('yyClass');
	          		$('#nButton').css("background","77EAA0");
	          		$('#chinese').html('预约');
	          		$('#english').html('make an appointment');
	          		$('.steps li:eq(2)').attr("class","complete");	
	          		if (lastChoose == '') {
	          			$('.steps li:eq(3)').attr("class","complete").html('<span class="step">3</span>体检缴费<span class="chevron">');	
	          			$('.steps li:eq(4)').attr("class","active").html('<span class="step">4</span>体检日期预约<span class="chevron">');	
	          		} else {
	          			$('.steps li:eq(3)').attr("class","complete");
	          			$('.steps li:eq(4)').attr("class","active").html('<span class="step">5</span>体检日期预约<span class="chevron">');				
	          		}
	              }
	                
	                
	            }
        });

    	  
      } 
    	  
		
//    	tjh000 = TJH000;
//    	tsxe00 = TSXE00;
//        var zjbh00 = $('#zjbh00').val();
//        var xm0000 = encodeURI(encodeURI($('#xm0000').val()));
//        var xb0000 = $('#xb0000').val();
//        var dhhm00 = $('#dhhm00').val();
//        var hyzk00 = $('#hyzk00').val();
//        var nl0000 = $('#nl0000').val();
//        var mz0000 = $('#mz0000').val();
//        var whcd00 = $('#whcd00').val();
//        var zylb00 = $('#zylb00').val();
//        var zjlx00 = $('#zjlx00').val();
////        var bmi = $('#bmi').val();
//        var lastChoose = $('#choose').val();
//        var choose = $('#choose').val();
////        var csrq00 = $('#csrq00').val();
////        var dz0000 = $('#dz0000').val();
////        var yxrqks = $('#yxrqks').val();
////        var yxrqjs = $('#yxrqjs').val();
////        var fzjg00 = $('#fzjg00').val();
////        var tz0000 = $('#tz0000').val();
////        var sg0000 = $('#sg0000').val();
//		var href = 'mainTj.htm?zjbh00=' + zjbh00
//				+ "&xm0000=" + xm0000 + "&xb0000="
//				+ xb0000 + "&bmi=" + bmi + "&zjlx00="
//				+ zjlx00 + "&yyid00=" + yyid00
//				+ "&nl0000=" + nl0000 + "&hyzk00="
//				+ hyzk00 + "&dhhm00=" + dhhm00
//				+ "&tsxe00=" + TSXE00 + "&mz0000="
//				+ mz0000 + "&whcd00=" + whcd00
//				+ "&zylb00=" + zylb00 + "&tjh000="
//				+ TJH000 + "&index=" + index + "&code="
//				+ code + "&lastChoose=" + lastChoose;
//		
//		if (SFSF00 == "0") {
//            choose = '9';
//            window.location.href = href + "&choose=" + choose+"&ydj000="+ydj000;
//        } else if (parseInt(KDXMS0) > 0 && SFSF00 == "1" &&TJYYRQ!="undefined") {
//            choose = "7";
//            window.location.href = href + "&choose=" + choose+"&tjyyrq="+TJYYRQ;
//        } else if (parseInt(KDXMS0) > 0 && SFSF00 == "1"&&TJYYRQ=="undefined") {
////            choose = "7";
//        	$('#mainDiv').hide();
//            $('#mainDiv22').show();
//            $('#topDIV').show();
//            var url = 'service/wjjm/GetPEItem.htm?tjh000=' + TJH000;
//            $.ajax({
//	            async : true,
//	            cache : false,
//	            dataType : 'json',
//	            type: 'post',
//	            contentType:"application/json;charset=UTF-8",
//	            url : url,//请求的action路径
//	            success :function(data) {
//	            	itemDatas = data.responseEntity.entity.rows;
//	                searchTjxmDatas1(itemDatas);
//	                getygj(TSXE00);
//	            }
//            });
//        } else if (parseInt(KDXMS0) == 0 && SFSF00 == "1") {
//            choose = "6";
//            window.location.href = href + "&choose=" + choose;
//        }
//        else{
//        	$('#mainDiv').hide();
//            $('#mainDiv22').show();
//            $('#topDIV').show();
//            var url = 'service/wjjm/GetPEItem.htm?tjh000=' + TJH000;
//            $.ajax({
//	            async : true,
//	            cache : false,
//	            dataType : 'json',
//	            type: 'post',
//	            contentType:"application/json;charset=UTF-8",
//	            url : url,//请求的action路径
//	            success :function(data) {
//	            	itemDatas = data.responseEntity.entity.rows;
//	            	zfje00=data.responseEntity.entity.zfje00;
//                	dsje00=data.responseEntity.entity.dsje00;
//	                searchTjxmDatas1(itemDatas);	                
//	        		$("#zfje00").html(zfje00);
//	        		$("#dsje00").html(dsje00);
//	                getygj(TSXE00);
//	            }
//            });
//        }
	}
	/* 获取项目 */
	function searchTjxmDatas1(itemDatas) {
		$('#tjxm-table').hide();
		$('#topDIV2').hide();
		$('#tcxm-table').bootstrapTable('destroy');
		$('#tcxm-table').bootstrapTable({
			classes : 'table-condensed',
			height : 730,
			//请求方法
			method : 'post',
			//是否显示行间隔色
			striped : false,
			//是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）     
			cache : true,
			data : itemDatas,
			//是否显示分页（*）  
			pagination : true,
			//是否启用排序  
			sortable : true,
			//排序方式 
			sortOrder : "asc",
			dataField : 'rows',
			contentType : 'application/json',
			dataType : 'json',
			//初始化加载第一页，默认第一页
			//我设置了这一项，但是貌似没起作用，而且我这默认是0,- -
			pageNumber : 1,
			//每页的记录行数（*）   
			pageSize : 11,
			queryParamsType : "limit",
			//可供选择的每页的行数（*）    
			pageList : [ 11, 22, 52, 100 ],
			//这个接口需要处理bootstrap table传递的固定参数,并返回特定格式的json数据  
			url : '',
			// 默认值为 'limit',传给服务端的参数为：limit, offset, search, sort, order Else
			queryParamsType : "undefined",
			// 查询参数,每次调用是会带上这个参数，可自定义                         
			queryParams : function(params) {
            	var temp = { //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的  
                        pageSize: params.pageSize,
                        //页面大小  
                        pageNumber: params.pageNumber
                        //页码 
                    };
                    return temp;
            },
			//分页方式：client客户端分页，server服务端分页（*）
			sidePagination : "client",
			paginationPreText: '上一页',
            // 分页
            paginationNextText: '下一页',
			// 是否显示搜索
			search : false,
			paginationHAlign : "left",
			paginationVAlign : 'bottom', //bottom, top, both
			strictSearch : false,
			// idField : "SQXMID",
			formatLoadingMessage : function() {
				return "请稍等，正在加载中...";
			},
			formatNoMatches : function() { //没有匹配的结果  
				return "无符合条件的记录";
			},
			rowStyle : function rowStyle(row, index) {
				return {
					css : {
						"white-space" : "nowrap",
						"margin" : "none",
						"height": "40px",
                        "line-height": "40px",
                        "font-size": "20px"
					}
				};
			},
			cellStyle : function cellStyle(value, row, index) {
				return {
					css : {
						"white-space" : "nowrap",
						"border" : "none",
						"height" : "30px"
					}
				};
			},
			onLoadSuccess : function(data) { //加载成功时执行  
				var data = $('#tjxm-table').bootstrapTable('getData');
			},
			onLoadError : function(data) { //加载失败时执行  

			},
			responseHandler:function(res) {
				tjxm = res.rows;
				return {
					"rows": tjxm
         		};
			},
			columns : [{
				field : 'SFXMMC',
				title : '项目名称',
				align : 'center',
				width : '400',
			}, {
				field : 'ZFJE00',
				title : '自费金额（元）',
				align : 'center',
				width : '100',
	      	}, {
	            field: 'shanchu',
	            title: '操作',
	            align: 'center',
	            width: '30',
	            formatter: function(value, row, index) {
	                // if (row.NOREMOVE == '0') {
	                if (row.SFSF00 == '1') {
	                    return '<a style="border:none;font-size:20px;">-</a>';
	                }else if(row.SFSF00 == '0'){
	                	return '<a style="border:none;font-size:20px;">-</a>';
	                }else{
	                    return '<a style="color:#FA8072;border:none;font-size:20px;" onclick="yy.removeAddJcxm(' + row.SQXMID + ')">删除</a>';
	                }
	            }
	      	}],
			onCheck : function(row) {
				rowData1 = row; //表格只允许单选，当选中行时设置行数据方便后续有可能的所有操作
			},
			onUncheck : function(row) {
				rowData1 = null; //
			}
		});
	}
	
	/* 获取项目 */
	function searchTjxmDatas(itemDatas) {
		$('#tjxm-table').show();
		$('#topDIV2').show();
		
		$('#tjxm-table').bootstrapTable('destroy');
		$('#tjxm-table').bootstrapTable({
			classes : 'table-condensed',
			height : 730,
			//请求方法
			method : 'post',
			//是否显示行间隔色
			striped : false,
			//是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）     
			cache : true,
			data: itemDatas,
			//是否显示分页（*）  
			pagination : true,
			//是否启用排序  
			sortable : true,
			//排序方式 
			sortOrder : "asc",
			dataField : 'rows',
			contentType : 'application/json',
			dataType : 'json',
			pageNumber : 1,
			//每页的记录行数（*）   
			pageSize : 11,
			queryParamsType : "limit",
			//可供选择的每页的行数（*）    
			pageList : [ 11, 22, 52, 100 ],
			//这个接口需要处理bootstrap table传递的固定参数,并返回特定格式的json数据  
			url : '',
			// 默认值为 'limit',传给服务端的参数为：limit, offset, search, sort, order Else
			queryParamsType : "undefined",
			clickToSelect : true,
			queryParams : function(params) {
            	var temp = { //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的  
                        pageSize: params.pageSize,
                        //页面大小  
                        pageNumber: params.pageNumber
                        //页码 
                    };
                    return temp;
            },
			//分页方式：client客户端分页，server服务端分页（*）
			sidePagination : "client",
			// 是否显示搜索
			search : false,
			paginationHAlign : "left",
			paginationVAlign : 'bottom', //bottom, top, both
			paginationPreText: '上一页',
            // 分页
            paginationNextText: '下一页',
			strictSearch : false,
			formatLoadingMessage : function() {
				return "请稍等，正在加载中...";
			},
			formatNoMatches : function() { //没有匹配的结果  
				return "无符合条件的记录";
			},
			rowStyle : function rowStyle(row, index) {
				return {
					css : {
						"white-space" : "nowrap",
						"margin" : "none",
						"height": "40px",
                        "line-height": "40px",
                        "font-size": "20px"
					}
				};
			},
			cellStyle : function cellStyle(value, row, index) {
				return {
					css : {
						"white-space" : "nowrap",
						"border" : "none",
						"height" : "30px"
					}
				};
			},
			onLoadSuccess : function(data) { //加载成功时执行  
				var data = $('#tjxm-table').bootstrapTable('getData');
			},
			onLoadError : function(data) { //加载失败时执行  

			},
			responseHandler:function(res) {
				tjxm = res.rows;
				return {
					"rows": tjxm
         		};
			},
			columns : [{
				field : 'SFXMMC',
				title : '项目名称',
				align : 'center',
				width : '400',
			}, {
				field : 'ZFJE00',
				title : '自费金额（元）',
				align : 'center',
				width : '100',
	      	}
	      	]
		});
	}
	//新增项目预估价
	function test() {
        var zongjia = 0;
        if (selected.length == 0) {
            $('#zongjia1').text(zongjia);
        } else if (selected.length > 0) {
            for (var i = 0; i < selected.length; i++) {
                zongjia = parseFloat(zongjia) + parseFloat(selected[i].DJ0000);
            }
            zongjia = zongjia + '';
            if (zongjia.indexOf(".") > 0) {
                zongjia = zongjia.substring(0, zongjia.indexOf(".") + 3);
            }
            $('#zongjia1').text(zongjia);
        }
    }
	// 预估价
	 function getygj(TSXE00) {
	        var data = $('#tcxm-table').bootstrapTable('getData'); // 获取已选项目
	        var zongjia = 0;
	        if (data.length == 0) {
	            $('#tsed').text(zongjia);
	        } else if (data.length > 0) {
	            for (var i = 0; i < data.length; i++) {
	                zongjia = parseFloat(zongjia) + parseFloat(data[i].YSJE00);
	            }
	            zongjia = parseFloat(TSXE00)-zongjia; 
	            tsed = zongjia + '';
	            if (tsed.indexOf(".") > 0) {
	            	tsed = tsed.substring(0, tsed.indexOf(".") + 3);
	            }
	            if (zongjia > 0) {
	            	$('#tsed').text(tsed);
	            	$('#zfxj').text(0);	
	            } else {
	            	$('#tsed').text(0);
	            	$('#zfxj').text(Math.abs(tsed));	
	            }
	        }
	    }
	 /* 删除项目 */
	    function removeAddJcxm(SQXMID) {
	        $('#tcxm-table').bootstrapTable('remove', {
	            field: 'SQXMID',
	            values: SQXMID
	        });
	        for(var i = 0;i < addArray.length;i++){
	        	if(addArray[i] == SQXMID){
	        		addArray.splice(i,1);
	        	}
	        };
	        getygj(tsxe00);
	        alter = true;
	    }
	 $('#addJcxmButton').click(function() {
	        $('#container1').hide();
	        var t2 = $('#tcxm-table').bootstrapTable("getData");
	        var addselect = new Array();
	        var k = 0;
		var conflicturl = 'service/wjjm/getPEItemConflict.htm?yyid00='+yyid00;
            var conflictproject
            $.ajax({
                type: "post",
                async: false,
                url: conflicturl,
                success: function(data) {
                    conflictproject = data.responseEntity.entity;
                }
            });
            var conflictmsg = "" ;
            var conflict;
            var conflictunion = [];
            //比较同时添加的项目
            for(var i = 0; i < selected.length-1; i++) {
                for (var j = selected.length - 1; j > i; j--) {
                    for (var g = 0; g < conflictproject.length; g++) {
                        if (selected[i].SQXMID == conflictproject[g].CTXMID || selected[i].SQXMID == conflictproject[g].SQXMID) {
                            if (selected[j]['SQXMID'] == conflictproject[g]['CTXMID'] || selected[j]['SQXMID'] == conflictproject[g]['SQXMID']) {

                                if ($.inArray(selected[i]['SQXMID'], conflictunion) != -1 && $.inArray(selected[j]['SQXMID'], conflictunion) != -1) {

                                } else if ($.inArray(selected[i]['SQXMID'], conflictunion) == -1 || $.inArray(selected[j]['SQXMID'], conflictunion) == -1) {

                                    conflictmsg += selected[i].SFXMMC+'<span style="color: #00ee00;">（新增）</span>' + '与' + selected[j].SFXMMC +'<span style="color: #00ee00">（新增）</span>'+ '；';
                                    conflictunion.push(selected[i]['SQXMID']);
                                    conflictunion.push(selected[j]['SQXMID']);
                                    conflict = true;
                                }
                            }
                        }
                    }
                }
            }
            var conflict1 = false;
            var conflictunion1 = [];
            var conflictmsg1 = "";
            //与外部项目比对
            for (var e = 0; e < itemDatas.length; e++ ){
                for (var f = 0; f < selected.length; f++ ) {
                    for (var h = 0; h < conflictproject.length ; h++){
                        if (itemDatas[e].SQXMID == conflictproject[h].CTXMID|| itemDatas[e].SQXMID == conflictproject[h].SQXMID) {
                            if(selected[f]['SQXMID'] == conflictproject[h]['CTXMID']|| selected[f]['SQXMID'] == conflictproject[h]['SQXMID']){

                                if ($.inArray(itemDatas[e]['SQXMID'],conflictunion1) != -1&&$.inArray(selected[f]['SQXMID'],conflictunion1) != -1){

                                } else if($.inArray(itemDatas[e]['SQXMID'],conflictunion1) == -1 || $.inArray(selected[f]['SQXMID'],conflictunion1) == -1){
                                    conflictmsg1 += itemDatas[e].SFXMMC+'<span style="color:red ;">（已有）</span>' +'与' +selected[f].SFXMMC +'<span style="color: #00ee00;">（新增）</span>'+'；';
                                    conflictunion1.push(itemDatas[e]['SQXMID']);
                                    conflictunion1.push(selected[f]['SQXMID']);
                                    conflict1 = true;
                                }
                            }
                        }
                    }
                }
            }
            if (conflict || conflict1) {
                bootbox.alert({
                    message: '<span style="font-size: 19px">'+conflictmsg+ conflictmsg1+'</span>',
                    buttons:{
                        ok:{
                            label:'确定'
                        }
                    },
                    title: '<span style="font-size: 19px">'+'冲突提示'+'</span>',
                    callback: function(){

                    }
                })
            } else {
                for (var i = 0; i < selected.length; i++) {
	            var isEq = false;
	            for (var j = 0; j < t2.length; j++) {
	                if (t2[j].SQXMID == selected[i].SQXMID) {
	                    isEq = true;
	                }
	            }                
	            if (!isEq) {
	            	for ( var s in selected[i] ) {
	            		if(s == 'DJ0000'){            			
	            			selected[i]["ZFJE00"] = selected[i][s];
	            			selected[i]["YSJE00"] = selected[i][s];
	            			selected[i]["TSJE00"] = selected[i][s];            			
	            		};
	            	}
	            	addselect[k] = selected[i];
	                k++;
	                addArray.push(selected[i].SQXMID);
	                alter = true;
	            }
	        }            
	        $('#tcxm-table').bootstrapTable("append", addselect);
	        $('#myModal').modal('hide');
	        getygj(tsxe00);
	        $(".search").val('');
	        selectionIds = [];
	        selected = [];
            }
	    });
	    $('#cancel').click(function() {
	    	$('#container1').hide();
	    	$(".search").val('');
	    	selectionIds = [];
	    	selected = [];
	    });
	    
	    // 提交订单事件
	    $('#qrddButton').click(function() {
	    	var tsed = $('#tsed').text();
	    	if (tsed > 0) {
	    		msg = "<font size=\"4\" face=\"verdana\" style='color:#46529E;font-size:20px;'>您的统收额度还剩"+tsed+"元，是否确认订单？<br /> 提交后,项目将不可在自助机更改。" + "</font>";
	    	} else {
	    		msg = "<font size=\"4\" face=\"verdana\" style='color:#46529E;font-size:20px;'>是否确认订单？<br /> 提交后,项目将不可在自助机更改。" + "</font>"
	    	}
	        bootbox.confirm({
	            buttons: {
	                confirm: {
	                    label: '确认',
	                    className: 'btn btn-primary'
	                },
	                cancel: {
	                    label: '取消',
	                    className: 'btn-default'
	                }
	            },
	            message: msg,
	            callback: function(result) {
	                if (result) {
	                	qrdd();
	                }
	            },
	            title: "提示"
	        });
	    	           
	    });

	    function qrdd(){
	        var zjbh00 = $('#zjbh00').val();
	        var xm0000 = encodeURI(encodeURI($('#xm0000').val()));
	        var dz0000 = encodeURI(encodeURI($('#dz0000').val()));
	        var xb0000 = $('#xb0000').val();
	        var dhhm00 = $('#dhhm00').val();
	        var hyzk00 = $('#hyzk00').val();
	        var nl0000 = $('#nl0000').val();
	        var mz0000 = $('#mz0000').val();
	        var whcd00 = $('#whcd00').val();
	        var zylb00 = $('#zylb00').val();
	        var zjlx00 = $('#zjlx00').val();
	        var bmi = $('#bmi').val();
	        var lastChoose = $('#choose').val();
	        var choose = $('#choose').val();
	        var csrq00 = $('#csrq00').val();
	        var yxrqks = $('#yxrqks').val();
	        var yxrqjs = $('#yxrqjs').val();
	        var fzjg00 = $('#fzjg00').val();
	        var tz0000 = $('#tz0000').val();
	        var sg0000 = $('#sg0000').val();	        
			var href = 'mainTj.htm?zjbh00=' + zjbh00
					+ "&xm0000=" + xm0000 + "&xb0000="
					+ xb0000 + "&bmi=" + bmi + "&zjlx00="
					+ zjlx00 + "&yyid00=" + yyid00
					+ "&nl0000=" + nl0000 + "&hyzk00="
					+ hyzk00 + "&dhhm00=" + dhhm00
					+ "&tsxe00=" + tsxe00 + "&mz0000="
					+ mz0000 + "&whcd00=" + whcd00
					+ "&zylb00=" + zylb00 + "&tjh000="
					+ tjh+ "&gyFlag="
					+ gyFlag+ "&tjyyrq="
					+ tjyyrq  + "&index=" + index + "&code="
					+ code + "&lastChoose=" + lastChoose;
	    	if (addArray.length > 0) {
	    		$.ajax({
	                type: "POST",
	                url: "service/wjjm/updateItem.htm",
	                contentType: "application/json",
	                dataType: "json",
	                //表示返回值类型，不必须
	                data: JSON.stringify({
	                    "tjh000": tjh,
	                    "ids": addArray.toString()
	                }),               
	                success: function(data) {
		                 if (data.code == '00') {                	                	 
		                	 if(parseFloat(data.zfje00) > 0) {
		                		choose = '9';
		                        window.location.href = href + "&choose=" + choose; 
		                	 } else {
		                		choose = "8";
		                        window.location.href = href + "&choose=" + choose; 
		                	 }
		                 } else {
		                 	bootbox.alert({
		                        buttons: {
		                            ok: {
		                                label: '确定',
		                                className: 'btn-default'
		                            }
		                        },
		                        message: "<font size=\"5\" face=\"verdana\" style='color:#46529E;font-size:20px;'>新增项目失败，请重试。</font>",
		                        callback: function() {
		                            my_interval = remainTime();
		                        },
		                        title: "提示"
		                    });
		                 }
	                }
	            });
	    	} else {
	    		choose = "8";
	            window.location.href = href + "&choose=" + choose; 
	    	}
	    }
	    
	    $('#keyboard li').click(function(e) {
	        var searchTerm = $(".search").val().toLowerCase();

	        if ($(this).hasClass('closeKeyboard') || $(this).hasClass('black')) {
	            return false;
	        } else {
	            searchAddDatas(); //再次查询后台，模糊查询用
	            var searchSplit = searchTerm.replace(/ /g, "'):containsi('");
	            $.each(xmCode, function(i) { //根据项目编码查询
	                if ((xmCode[i].PYSM00).indexOf(searchSplit) >= 0) { //存在该字符串
	                    $("#xzjcxm-table tbody tr[data-index=" + i + "]").show();
	                } else {
	                    $("#xzjcxm-table tbody tr[data-index=" + i + "]").hide();
	                }
	            });
	            $('#xzjcxm-table').bootstrapTable('resetView');
	        }
	    });
	    
	    function inputFoucs() {
	        $('#container1').show();
	    }
	 
	function queryAddParams(params) { //配置参数  
		var temp = { //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的  
			search : params.searchText
		};
		return temp;
	}
	
	function yysj(tjh,KDRQ00,basePath) {
//		var Money = getzongjia();
		
		var yyflag = 0;  //'0' 预约  '1' 改约  '2' 取消
		var zjbh00 = $('#zjbh00').val();
		var xm0000 = encodeURI(encodeURI($('#xm0000').val()));
		var dhhm00 = $('#dhhm00').val();
		if (isGy) {
			yyflag = 1;
		}
		var url = 'service/wjjm/yyTj.htm?ReqDate=' + KDRQ00 + '&tjh000='+ tjh+ '&Money=' + zfje00 + '&yyflag=' + yyflag +'&yyid00='+yyid00 +'&zjbh00=' +zjbh00 + '&xm0000=' + xm0000 + '&dhhm00=' + dhhm00;				
		var date = KDRQ00.substr(0,4)+"年"+KDRQ00.substr(4,2)+"月"+KDRQ00.substr(6,2)+"日";
		bootbox.confirm({ 
	        buttons: {  
	            confirm: {  
	                label: '确定',  
	                className: 'btn btn-primary'  
	            },  
	            cancel: {  
	                label: '取消',  
	                className: 'btn-default'  
	            }  
	        },  
	        message: "<font size=\"6\" face=\"verdana\" style='color:#46529E;font-size:20px;'>您将预约"+ date +"的体检，是否确定？</font>",  
	        callback: function(result) {  
	            if(result) {
	            	$("#loading_img").html(_LoadingHtml3);
	            	$.ajax({
	            		type: "post",
	            		url: url,
	            		dataType: "json",
	            		success: function(data) {
	            			$("#loading_img").hide();
	            			if (data.responseEntity.errorcode == "00") {
	            				var messages;
	            				ReqDate = KDRQ00.substr(0, 4) + "-" + KDRQ00.substr(4, 2) + "-" + KDRQ00.substr(6, 2);
	            				if(new Date().toDateString() === new Date(ReqDate).toDateString()) {//判断是否为当天
	            					    qd(ReqDate,tjh);
	            				} else {	//不是当天日期
                                    
	            					var yyrqgg = KDRQ00.substr(0,4)+"-"+KDRQ00.substr(4,2)+"-"+KDRQ00.substr(6,2);
	            					var xm0000 = $('#xm0000').val();
	            					peisPrintYYPT(xm0000, yyrqgg, yyid00);
	            					messages = "<font size=\"6\" face=\"verdana\" style='color:#46529E;font-size:20px;'>"
	            						+data.responseEntity.message+"<br/>(请于预约时间当天前往医院签到体检)</font>" ;
	            					bootbox.alert({  
	            						buttons: {  
	            							ok: {  
	            								label: '返回首页',  
	            								className: 'btn-default'  
	            							}  
	            						},  
	            						message: messages,  
	            						callback: function() {  
	            							window.location.href = basePath + "&index=" + index + "&code=" + code;
	            						},  
	            						title: "提示"  
	            					});
	            					backFirst();
	            				}	            	
	            			} else {
	            				bootbox.alert({  
	            					buttons: {  
	            						ok: {  
	            							label: '确定',  
	            							className: 'btn-default'  
	            						}  
	            					},  
	            					message:data.responseEntity.message,  
	            					callback: function() {
	            					},  
	            					title: "提示"  
	            				});  
	            			}                 
	            		}
	            	});
	            } 
	        },  
	        title: "提示"
	        });  
	}
	
//	//总金额
//	function getzongjia() {
//	    var zongjia = 0;
//	    var allTableData = $('#tjxm-table').bootstrapTable('getData');//获取表格的所有内容行 
//        var flag = false;  
//        for( var i = 0; i < allTableData.length; i++) {
//        	if(allTableData[i].SFSF00=='0'){
//        	zongjia = parseFloat(zongjia) + parseFloat(allTableData[i].ZFJE00); 
//        	}
//        }  
//        zongjia = zongjia + '';
//        if(zongjia.indexOf(".") > 0) {
//            zongjia = zongjia.substring(0,zongjia.indexOf(".") + 3);                      
//        }        
//        if (zongjia.length == 3) {
//        	$('#zongjia').css("margin-right","27px");
//        } else {
//        	$('#zongjia').css("margin-right","40px");	        	
//        }
//        return zongjia;
//	}
	
	/* 打印指引单*/
	function peisPrint(patientInfo, itemInfo){
		var exepath = "PeisPrintConsole.exe \"";
		try {
			var shellActiveXObject = new ActiveXObject("WScript.Shell");
			if ( !shellActiveXObject ) {
				 console.info('无法创建WScript.Shell');
				 return;
			}
			var exepath = shellActiveXObject.ExpandEnvironmentStrings("%printpath%");
			//exepath = exepath + "PeisPrintConsole.exe \"0\" \"" + patientInfo +"\" \""+itemInfo+"\" \"\" \""+barcodeCount+"\" ";
			var exepath1 = -1;
			if(writeText(exepath, patientInfo, itemInfo)){
				var exepath = exepath + "PeisPrintConsole.exe " + exepath + "\peisZYD.txt ";
				exepath1 = shellActiveXObject.Run(exepath, 1, true);
			}
			
			shellActiveXObject = null;
			return exepath1;
		} catch(e) {			
			console.info("打印失败！在目录"+ exepath +"下无法找到程序PeisPrintConsole.exe");
		}
	}
	
	/* 打印预约凭条*/
	function peisPrintYYPT(xm0000, yyrqgg, yyid00) {
		var exepath = "PeisPrintConsole.exe \"";
		try {
			var shellActiveXObject = new ActiveXObject("WScript.Shell");
			if ( !shellActiveXObject ) {
				console.info('无法创建WScript.Shell');
				 return;
			}
			var exepath = shellActiveXObject.ExpandEnvironmentStrings("%printpath%");
			exepath = exepath + "PeisPrintConsole.exe \"1\" \"" + xm0000+"\" \""+yyrqgg+"\" \""+yyid00+"\" ";
			console.info(exepath);
			shellActiveXObject.Run(exepath, 1, false);
			shellActiveXObject = null;
		} catch(e) {
			console.info("打印失败！在目录"+ exepath +"下无法找到程序PeisPrintConsole.exe");
		}
	}
	
    //签到
    function qd(tjyyrq,tjh) {
        var zjbh00 = $('#zjbh00').val();
        var xm0000 = encodeURI(encodeURI($('#xm0000').val()));
        var xb0000 = $('#xb0000').val();
        var dhhm00 = $('#dhhm00').val();
        var choose = $('#choose').val();
        var hyzk00 = $('#hyzk00').val();
        var nl0000 = $('#nl0000').val();
        var mz0000 = $('#mz0000').val();
        var whcd00 = $('#whcd00').val();
        var zylb00 = $('#zylb00').val();
        var bmi = $('#bmi').val();
        var zjlx00 = $('#zjlx00').val();
        var photo = $('#photo').val();
        var yyid00 = $('#yyid00').val();
        var url = 'service/wjjm/qd.htm?tjh000=' + tjh + '&zjbh00=' + zjbh00 + '&xm0000=' + xm0000 + '&dhhm00=' + dhhm00 + '&xb0000=' + xb0000 + '&choose=' + choose + '&nl0000=' + nl0000 + '&mz0000=' + mz0000 + '&whcd00=' + whcd00 + '&zylb00=' + zylb00 + '&hyzk00=' + hyzk00 + '&bmi=' + bmi + '&photo=' + photo + '&yyid00=' + yyid00 + '&tjyyrq=' + tjyyrq + '&zjlx00=' + zjlx00;
        // $("#loading_img").html(_LoadingHtml);
        if (yyid00 === '222667' & (questiontjlxid === '5' || questiontjlxid === '11'||questiontjlxid === '43' ) ) {
	  	var wjbzbm = ''
		if (questiontjlxid === '15') {
	  	wjbzbm = 'QC002'
          } else {
          	wjbzbm = 'QC003'
		disease = [{name: '高血压病', id1: 'QA001', id2: 'QA002'}, {name: '冠心病', id1: 'QA003', id2: 'QA004'}, {name: '风心病', id1: 'QA005', id2: 'QA006'}, {name: '先心病', id1: 'QA007', id2: 'QA008'}, {name: '心肌病', id1: 'QA009', id2: 'QA010'}, {name: '支气管扩张', id1: 'QA011', id2: 'QA012'}, {name: '支气管哮喘', id1: 'QA013', id2: 'QA014'}, {name: '肺气肿', id1: 'QA015', id2: 'QA016'}, {name: '消化性溃疡', id1: 'QA017', id2: 'QA018'}, {name: '肝硬化', id1: 'QA019', id2: 'QA020'}, {name: '胰腺疾病', id1: 'QA021', id2: 'QA022'}, {name: '急慢性肾炎', id1: 'QA023', id2: 'QA024'}, {name: '肾功能不全', id1: 'QA025', id2: 'QA026'}, {name: '结缔组织病', id1: 'QA027', id2: 'QA028'}, {name: '糖尿病', id1: 'QA029', id2: 'QA030'}, {name: '甲亢', id1: 'QA031', id2: 'QA032'}, {name: '贫血', id1: 'QA033', id2: 'QA034'}, {name: '癫痫', id1: 'QA035', id2: 'QA036'}, {name: '精神病', id1: 'QA037', id2: 'QA038'}, {name: '神经官能症', id1: 'QA039', id2: 'QA040'},{name: '吸毒史', id1: 'QA041', id2: 'QA042'},{name: '急慢性肝炎', id1: 'QA043', id2: 'QA044'},{name: '结核病', id1: 'QA045', id2: 'QA046'},{name: '性传播疾病', id1: 'QA047', id2: 'QA048'}, {name: '恶性肿瘤', id1: 'QA049', id2: 'QA050'},{name: '手术史', id1: 'QA051', id2: 'QA052'},{name: '严重外伤史', id1: 'QA053', id2: 'QA054'},{name: '其他', id1: 'QA055', id2: 'QA056'}]
          $('.companyinfo, .jobinfo').hide()
 
          }
          $('.rightTab').show()
        	var character = new Array("A", "B", "C", "D", "E", "F", "G", "H", "J",
            "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "W", "X",
            "Y", "Z");
          for (var i = 0; i < character.length; i++) {// 遍历23个拼音首字母
            $('#nameModal .header').append(
              '<font class="character">' + character[i] + '</font>');
          }
            function submmit() {
		var info = [];
                for (var i = 0; i < $('.choose').length; i++) {
                    console.log($('.choose').eq(i).prop('checked'))
                    if ($('.choose').eq(i).prop('checked') === true) {
                        console.log($('.recoverdate').eq(i).val())
                        info.push(disease[i].id1+ ':' + $('.recoverdate ').eq(i).val())
                    } else {
                        info.push(disease[i].id2+ ':')
                    }
                }
	if (questiontjlxid === '15') {
	info.push('QA045'+':'+ encodeURI(encodeURI($('#company').val())))
                info.push('QA046'+ ':' + encodeURI(encodeURI($('#job').val())))
	}
                $('.signpad').css('display','block')
                dainfo = info.join()
            }
            function clearsign () {
                signaturePad.clear()
            }
            function signsubmmit () {
                if (signaturePad.isEmpty()) {
		$('.bootbox').css('zIndex','9999999')
		bootbox.confirm({
                  buttons: {
                    confirm: {
                      label: '确定',
                      className: 'btn btn-primary'
                    }
                  },
                  message: "<font size=\"4\" face=\"verdana\" style='color:#46529E;font-size:20px;'>请进行手写签名</font>",
                  callback: function(result) {
                    
                  },
                  title: "提示"
                });
		
                } else {
                    var str = 'data:image/png;base64,'
                    var zjbh00 = $('#zjbh00').val()
                    var sign = signaturePad.toDataURL("image/jpeg").slice(23)
                    var urlques = "service/wjjm/updateAssess.htm?tjh000=" + questiontjh000 + '&wjbzbm=' + wjbzbm + '&dainfo=' + dainfo;
                    $.ajax({
                        type: "POST",
                        url: urlques,
                        contentType: "application/json",
                        //必须有
                        dataType: "json",
                        //表示返回值类型，不必须
                        async: false,
                        success: function (data) {
                            var data1 = '{"tjh000": \"' + questiontjh000 + '\"' + ',"zjbh00": \"' + zjbh00 + '\",' + '"sign":  \"' + sign + '\"}'
                            $.ajax({
                                type: "POST",
                                url: "service/wjjm/updateSign.htm",
                                contentType: "application/json",
                                //必须有
                                dataType: "json",
                                //表示返回值类型，不必须
                                async: false,
                                data: data1,
                                success: function (data) {
					$("#loading_img").html(_LoadingHtml);
                                     $.ajax({
            type: "post",
            url: url,
            dataType: "json",
            success: function(data) {
              $("#loading_img").hide();
              var entity=data.responseEntity.entity;
              var msg,msg1;
              if( djtsxx == undefined){
                djtsxx = '';
              }
              if (data.responseEntity.errorcode == "00") {
                msg = "正在打印指引单和条码，请耐心等待打印完成...";
                msg1 = "打印完成，请执指引单和条码到相应科室进行体检。";
                if (entity.barcodeCount <= 0) {
                  msg = "正在打印指引单，请耐心等待打印完成...";
                  msg1 = "打印完成，请执指引单到相应科室进行体检。";
                }
                msg = msg + djtsxx;
                msg1 = msg1 + djtsxx;
                if (entity.zydyd0 == '1') { //是否有指引单 0没有 1有
                  var entity = data.responseEntity.entity;
                  var cxh000 = entity.cxh000;
                  var ddrs00 = entity.ddrs00;
                  var msg = "正在打印抽血凭条，请耐心等待打印完成...";
                  var xm0001 = $('#xm0000').val();
                  var tjh000 = tjh;
                  $('#dyts').html(msg);
                  $('#myModal3').modal('show');
                  var exepath1 = peisPrintCXPT(xm0001, tjh000, cxh000, ddrs00);
                  if (exepath1 == 0 ) {
                    $('#myModal3').modal('hide');
                    bootbox.alert({
                      buttons: {
                        ok: {
                          label: '返回首页',
                          className: 'btn-default'
                        }
                      },
                      message: "<font size=\"4\" face=\"verdana\" style='color:#46529E;font-size:20px;'>打印完成，请执抽血凭条到相应科室进行体检。（如未打印抽血凭条，请至前台咨询！）</font>",
                      callback: function() {
                        window.location.href = basePath1 + "&index=" + index1 + "&code=" + code1;
                      },
                      title: "提示"
                    });
                    backFirst();
                  }
                } else {
                  $('#dyts').html(msg);
                  $('#myModal3').modal('show');
                  var exepath1 = peisPrint(data.responseEntity.entity.patientInfo, data.responseEntity.entity.itemInfo);
                  if (exepath1 == 0) {
                    $('#myModal3').modal('hide');
                    bootbox.alert({
                      buttons: {
                        ok: {
                          label: '返回首页',
                          className: 'btn-default'
                        }
                      },
                      message: "<font size=\"4\" face=\"verdana\" style='color:#46529E;font-size:20px;'>"+ msg1 +"</font>",
                      callback: function() {
                        window.location.href = basePath1 + "&index=" + index1 + "&code=" + code1;
                      },
                      title: "提示"
                    });
                    backFirst();
                  }
                }
//	       			sap.Speak("正在为您打印指引单和条码，共两份，请稍候，");
              } else {
                bootbox.confirm({
                  buttons: {
                    confirm: {
                      label: '确定',
                      className: 'btn btn-primary'
                    },
                    cancel: {
                      label: '返回首页',
                      className: 'btn-default'
                    }
                  },
                  message: "<font size=\"4\" face=\"verdana\" style='color:#46529E;font-size:20px;'>" + data.responseEntity.message + "</font>",
                  callback: function(result) {
                    if (result) {} else {
                      window.location.href = basePath1 + "&index=" + index + "&code=" + code;
                    }
                  },
                  title: "提示"
                });
              }
            }
          });
                                },
                                error: function (datas) {
                                    console.log(datas)
                                }
                            });
                        }
                    });
                }
            }
  			$('.questionsubmmit').click(function () {
				submmit()
            })
			$('#wjfhButton').click(function () {
				$('.rightTab').hide();
			})
			$('.clearbutton').click(function () {
				clearsign()
            })
			$('.submmitbutton').click(function () {
				signsubmmit()
            })
          $('.character').click(function() {
	     console.log(nowthis)
	
            $('#nameModal').scrollTop(0);// 默认先返回顶部
            var chara = $(this).html().toLowerCase();
            var pinyin = $('.zhimu strong');
            for (var i = 0; i < pinyin.length; i++) {
              if (chara == pinyin.eq(i).html()) {
                position = pinyin.eq(i).position().top;// 获取当前位置
                $('.zhimu:eq(' + i + ')').show();
                $('.zhimu:gt(' + i + ')').hide();// 大于该索引隐藏
                $('.zhimu:lt(' + i + ')').hide();// 小于该索引隐藏
                $("[id^='py_" + i + "']").show();// 显示点击的字母
                $('.p1:gt(' + i + ')').hide();// 大于该索引文字块隐藏
                $('.p1:lt(' + i + ')').hide();// 小于该索引文字块隐藏
                $("[id^='py_']").not("[id^='py_" + i + "']").hide();// 非包含隐藏
                if (i == 1) {
                  $("[id^='py_1_']").show();
                  $("[id^='py_']").not("[id^='py_1_']").hide();// 隐藏重复1开头
                } else if (i == 2) {
                  $("[id^='py_2_']").show();
                  $("[id^='py_']").not("[id^='py_2_']").hide();// 隐藏重复2开头
                }
                $('#nameModal').scrollTop(pinyin.eq(i).position().top - 70); // 滚动到当前点击字母拼音所在
              }
            }
          });
          // 工作单位 报考职位输入框
          // 删除字符
          $('#removeText').click(function() {
            var name = nowthis1.val();
            nowthis1.val(name.substring(0,name.length-1));
          });
          $('#closetext').click(function() {
            $('#nameModal').modal('hide')
          })
	 $('.diseaseclass').remove()
          for (var i = 0; i < disease.length; i++) {
		
		$('#disease').append('<div style=\'display: block; float: left;width: 33%;height: 65px\' class=\'diseaseclass\'>' +
        '<input type="checkbox" value='+ disease[i] +' class="yhxx-input choose" style="width:40%;"id='+ disease[i].id1 +'>' + '<label for='+ disease[i].id1+'>'+ disease[i].name +'</label>' +
        '<div class="yhxx-left" style="display: none;width: 40%;margin-left: 4%" ><span>' +
        '<input class="yhxx-input recoverdate" id="name51" type="text" style="border:none;width:112%;" placeholder="治愈时间:20180101" /></span></div>' +
        '</div>')
		
            
          }
          $('input').on('ifChecked', function (event) {
            console.log(event.currentTarget.checked)
            console.log($(this).parent().siblings('.yhxx-left').css('display','inline-block'))
            console.log($(this).attr('id'))
          })
          $('input').on('ifUnchecked', function (event) {
            console.log(event.currentTarget.checked)
            console.log($(this).parent().siblings('.yhxx-left').css('display','none'))
            console.log($(this).attr('id'))
          })
          $('input').iCheck({
            checkboxClass: 'icheckbox_square-blue',
            radioClass: 'iradio_square-blue',
            increaseArea: '40%'
          });
          $('.recoverdate').click(function(e) {
            nowthis = $(this)
            $('.recoverdate').attr("placeholder","");
            // $('#nameModal').modal('hide');
            $('.layer-content').animate({
              bottom : '0'
            }, 200);
            // cmd.run("cmd /c start"+" "+"taskkill /f /t /im handinput.exe");
          });
          // 数字键盘 输入
          $('.form_edit .num').click(function() {
            var numDiv = $(this).html();
            var oDiv = nowthis.val();
            nowthis.val(oDiv + numDiv)
          });
          $('#removeNum').click(function() {
            var name = nowthis.val();
            nowthis.val(name.substring(0,name.length-1));
          });
          $('#dateConfirm').click(function() {
            var date00 = nowthis.val();
           if (date00.length !== 0 ) {
        var date00 = date00.slice(0, 4) + '-' +date00.slice(4, 6) + '-' +date00.slice(6, 8)
        console.log(date00)
        var time1 = new RegExp('(([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29)').test(date00)
        if (time1) {
          $('.layer-content').animate({
            bottom : '-400px'
          }, 200);
        } else {
	bootbox.confirm({
                  buttons: {
                    confirm: {
                      label: '确定',
                      className: 'btn btn-primary'
                    }
                  },
                  message: "<font size=\"4\" face=\"verdana\" style='color:#46529E;font-size:20px;'>请填写正确日期</font>",
                  callback: function(result) {
                    
                  },
                  title: "提示"
                });
        }
      } else {
        $('.layer-content').animate({
          bottom : '-400px'
        }, 200);
      }
          });
    		} else {
$("#loading_img").html(_LoadingHtml);
          $.ajax({
            type: "post",
            url: url,
            dataType: "json",
            success: function(data) {
              $("#loading_img").hide();
              var entity=data.responseEntity.entity;
              var msg,msg1;
              if( djtsxx == undefined){
                djtsxx = '';
              }
              if (data.responseEntity.errorcode == "00") {
                msg = "正在打印指引单和条码，请耐心等待打印完成...";
                msg1 = "打印完成，请执指引单和条码到相应科室进行体检。";
                if (entity.barcodeCount <= 0) {
                  msg = "正在打印指引单，请耐心等待打印完成...";
                  msg1 = "打印完成，请执指引单到相应科室进行体检。";
                }
                msg = msg + djtsxx;
                msg1 = msg1 + djtsxx;
                if (entity.zydyd0 == '1') { //是否有指引单 0没有 1有
                  var entity = data.responseEntity.entity;
                  var cxh000 = entity.cxh000;
                  var ddrs00 = entity.ddrs00;
                  var msg = "正在打印抽血凭条，请耐心等待打印完成...";
                  var xm0001 = $('#xm0000').val();
                  var tjh000 = tjh;
                  $('#dyts').html(msg);
                  $('#myModal3').modal('show');
                  var exepath1 = peisPrintCXPT(xm0001, tjh000, cxh000, ddrs00);
                  if (exepath1 == 0 ) {
                    $('#myModal3').modal('hide');
                    bootbox.alert({
                      buttons: {
                        ok: {
                          label: '返回首页',
                          className: 'btn-default'
                        }
                      },
                      message: "<font size=\"4\" face=\"verdana\" style='color:#46529E;font-size:20px;'>打印完成，请执抽血凭条到相应科室进行体检。（如未打印抽血凭条，请至前台咨询！）</font>",
                      callback: function() {
                        window.location.href = basePath1 + "&index=" + index1 + "&code=" + code1;
                      },
                      title: "提示"
                    });
                    backFirst();
                  }
                } else {
                  $('#dyts').html(msg);
                  $('#myModal3').modal('show');
                  var exepath1 = peisPrint(data.responseEntity.entity.patientInfo, data.responseEntity.entity.itemInfo);
                  if (exepath1 == 0) {
                    $('#myModal3').modal('hide');
                    bootbox.alert({
                      buttons: {
                        ok: {
                          label: '返回首页',
                          className: 'btn-default'
                        }
                      },
                      message: "<font size=\"4\" face=\"verdana\" style='color:#46529E;font-size:20px;'>"+ msg1 +"</font>",
                      callback: function() {
                        window.location.href = basePath1 + "&index=" + index1 + "&code=" + code1;
                      },
                      title: "提示"
                    });
                    backFirst();
                  }
                }
//	       			sap.Speak("正在为您打印指引单和条码，共两份，请稍候，");
              } else {
                bootbox.confirm({
                  buttons: {
                    confirm: {
                      label: '确定',
                      className: 'btn btn-primary'
                    },
                    cancel: {
                      label: '返回首页',
                      className: 'btn-default'
                    }
                  },
                  message: "<font size=\"4\" face=\"verdana\" style='color:#46529E;font-size:20px;'>" + data.responseEntity.message + "</font>",
                  callback: function(result) {
                    if (result) {} else {
                      window.location.href = basePath1 + "&index=" + index + "&code=" + code;
                    }
                  },
                  title: "提示"
                });
              }
            }
          });
				}
    }
    // 公务员问卷和教师问卷
    //取号
	function qh(tjh,tjyyrq) {
		var xm0000 = $('#xm0000').val();
		var tjh000 = tjh;
		var choose = $('#choose').val();
        var url = 'service/wjjm/qd.htm?tjh000=' + tjh + '&tjyyrq='+tjyyrq+'&choose='+choose;
        $("#loading_img").html(_LoadingHtml);
        $.ajax({
			url: url,
			datatype: "json",
			type: "post",
			contentType: "application/json;charset=UTF-8",
			success: function(data) {
				$("#loading_img").hide();
				var entity=data.responseEntity.entity;
				var cxh000 = entity.cxh000;
				var ddrs00 = entity.ddrs00;
				var msg = "正在打印抽血凭条，请耐心等待打印完成...";
				$('#dyts').html(msg);
            	$('#myModal3').modal('show');
            	var exepath1 = peisPrintCXPT(xm0000, tjh000, cxh000, ddrs00);
            	if (exepath1 == 0 ) {
            		bootbox.alert({
                        buttons: {
                            ok: {
                                label: '返回首页',
                                className: 'btn-default'
                            }
                        },
                        message: "<font size=\"4\" face=\"verdana\" style='color:#46529E;font-size:20px;'>打印完成，请执抽血凭条到相应科室进行体检。（如未打印抽血凭条，请至前台咨询！）</font>",
                        callback: function() {
                            window.location.href = basePath1 + "&index=" + index1 + "&code=" + code1;
                        },
                        title: "提示"
                    });
            		backFirst();
            	}
//				sap.Speak("正在为您打印抽血凭条，仅一份，请稍候，");
			}
        });
	}
	//打印取号单
	function peisPrintCXPT(xm0000, tjh000, cxh000, ddrs00) {
		var exepath = "PeisPrintConsole.exe \"";
		try {
			var shellActiveXObject = new ActiveXObject("WScript.Shell");
			if ( !shellActiveXObject ) {
				console.info('无法创建WScript.Shell');
				 return;
			}
			var exepath = shellActiveXObject.ExpandEnvironmentStrings("%printpath%");
			exepath = exepath + "PeisPrintConsole.exe \"4\" \"" + xm0000+"\" \"" + tjh000+"\" \""+cxh000+"\" \""+ddrs00+"\" ";
			console.info(exepath);
			var exepath1 = shellActiveXObject.Run(exepath, 1, true);
			shellActiveXObject = null;
			return exepath1;
		} catch(e) {
			console.info("打印失败！在目录"+ exepath +"下无法找到程序PeisPrintConsole.exe");
		}
	}	
	
	//
    function writeText(filePath, patientInfo, itemInfo){
		var fso;
		try { 
			fso=new ActiveXObject("Scripting.FileSystemObject"); 
		} catch (e) { 
			alert("当前浏览器不支持");
			return false;
		} 
		var f1 = fso.createtextfile(filePath + "peisZYD.txt", true);
		f1.writeLine(patientInfo);
		f1.writeLine(itemInfo);
		f1.close();
		return true;
    }
    //15s返回首页
	function backFirst(){
		var n = 15;
		var fhsy = setInterval(function (){
			$('.btn-default').html('返回首页('+n+')');
			n--;
			if (n == 0 ) {
				clearInterval(fhsy);
				window.location.href = basePath1 + "&index=" + index1 + "&code=" + code1;
			}
		},1000);
	}
	window.yy = {
		init: init,
		chooseTc: chooseTc,
		yysj: yysj,
//		getzongjia: getzongjia,
		qd: qd,
		qh: qh,
		removeAddJcxm:removeAddJcxm,
	    inputFoucs: inputFoucs
	};
})
