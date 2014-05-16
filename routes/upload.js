// uploadify 
exports.upload = function (req, res) {
	var fileDesc = req.files,
	    imgname = fileDesc.Filedata.name,
	    path = fileDesc.Filedata.path,
	    name = path.replace(config.datapath, ''),
	    imgurl = 'http://localhost:3002/upload/' + name;//本地版本
	res.send(imgurl);
};