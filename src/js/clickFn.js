import '../css/style.css';
import Waves from './waves';
Waves.init();
document.getElementById("btn").addEventListener("click", function() {
	clearTimeout(timer);
	var timer = setTimeout(function() {
		alert("webpack");
	}, 500);
});