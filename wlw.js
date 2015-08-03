var d = document;

if (d.getElementById('wlw_custom')==null) {

var p1 = d.querySelectorAll('.block_playdata_01_text');
// �g�p�� ... usage rate
var ur = parseFloat(p1[0].innerHTML);
// ������ ... win count
var wc = parseInt(p1[1].innerHTML);
// �����j�� ... crush count
var crc = parseInt(p1[2].innerHTML);
// ���P�ސ� ... withdraw count
var wdc = parseInt(p1[3].innerHTML);

var p2 = d.querySelectorAll('.block_playdata_02_text');
// �L���X�g�ʕ]��(����) ... total page
var tp = parseFloat(p2[0].innerHTML);
// ������(����) ... win page
var wp = parseFloat(p2[1].innerHTML);
// �s�k��(����) ... lose page
var lp = parseFloat(p2[2].innerHTML);

// �l���i�C�X(����) ... total nice
var tn = parseFloat(p2[3].innerHTML);
// ������(����) ... win nice
var wn = parseFloat(p2[4].innerHTML);
// �s�k��(����) ... lose nice
var ln = parseFloat(p2[5].innerHTML);

// �s�k�� ... lose count
var lc = 0;
if ((tp-lp)!=0) {
	lc = parseInt(Math.round((wp-tp)*wc/(tp-lp)));
} 
// ���� ... win rate
var wr = 0;
if ((wc+lc)!=0) {
	wr = Math.round(wc/(wc+lc)*100*10)/10;
}
// Kill Ratio ... kill ratio
var kr = 0;
if (wdc!=0) {
	kr = Math.round(crc/wdc*100)/100;
}

// �S�L���X�g���� ... all win rate
var awr = 0;
// �S�L���X�g������ ... all win count
var awc = 0;
// �S�L���X�g�s�k�� ... all lose count
var alc = 0;
// �e�L���X�g�̏��� ... cast win rate array
var cwra = [];
// �e�L���X�g�̏����� ... cast win count array
var cwca = [];
// �e�L���X�g�̔s�k�� ... cast lose count array
var clca = [];
// MEMO: �L���X�g�ǉ����̎b��Ή��́Adci��dcn��ǉ��őΉ�����
// �\������e�L���X�g��ID ... display cast id
var dci = [0, 32, 1, 9,41, 2, 11, 13, 45, 3, 7, 5,8];
// �\������e�L���X�g�̖��O ... display cast name
var dcn = ["�T���h������", "�A�V�F���v�e��", "�g���ÕF", "����","�吹",
		"�s�[�^�[�E�U�E�L�b�h", "�V���l�b�^", "�~�N�T", "����",
		"���g���E�A���X", "�A�C�A���E�t�b�N", "�X�J�[���b�g","������"];
// ������
for (var i = 0; i < dci.length; i++) {
	cwra[dci[i]] = 0;
	cwca[dci[i]] = 0;
	clca[dci[i]] = 0;
}

// �L���X�gID ... cast id
// ���������k�̂��߁A�p�����[�^��cast��O��Ƃ���
var q = window.location.search.substring(1);
var ci = q.split("=")[1];
var pci = "p" + ci;

// �L���X�g�f�[�^ ... cast data
// �O��̃L���X�g�f�[�^ ... pre cast data
// �������A�g�p���A�������A�s�k���A�����A�����j���A���P�ސ��AKill Ratio�A
// �L���X�g�ʕ]��(����)�A������(����)�A�s�k��(����)�A
// �l���i�C�X(����)�A������(����)�A�s�k��(����)
var now = new Date().getTime();
var cd = [now, ur, wc, lc, wr, crc, wdc, kr, tp, wp, lp, tn, wn, ln];
var pcd = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var ppcd = pcd.concat();

var day = 1000*3600*24;
// Cookie�̗L������(365����)
var ex = new Date();
ex.setTime(now+day*365);

// Cookie�̓ǂݍ���
// �O��̃L���X�g�f�[�^���擾
if (d.cookie) {
	var c = d.cookie.split(";");
	for (var i = 0; i < c.length; i++) {
		var kv = c[i].trim().split("=");
		var tpcd = unescape(kv[1]).split(":");
		if (isFinite(kv[0])) {
			var twc = parseInt(tpcd[2]);
			var tlc = parseInt(tpcd[3]);
			var twr = 0;
			if ((twc+tlc)!=0) {
				twr = Math.round(twc/(twc+tlc)*100*10)/10;
			}
			awc += twc;
			alc += tlc;
			cwra[kv[0]] = twr;
			cwca[kv[0]] = twc;
			clca[kv[0]] = tlc;
		}
		if (kv[0] == ci) {
			pcd = tpcd;
		}
		if (kv[0] == pci) {
			ppcd = unescape(kv[1]).split(":");
		}
	}
}

awc = awc - parseInt(pcd[2]) + wc;
alc = alc - parseInt(pcd[3]) + lc;
if ((awc+alc)!=0) {
	awr = Math.round(awc/(awc+alc)*100*10)/10;
}
cwra[ci] = wr;
cwca[ci] = wc;
clca[ci] = lc;

// �g�p���A�������A�L���X�g�ʕ]��(����)�A������(����)�A�s�k��(����)�Ŕ�r
if (cd[1]!=pcd[1] || cd[2]!=pcd[2] || cd[8]!=pcd[8] || cd[9]!=pcd[9] || cd[10]!=pcd[10]) {
	d.cookie = ci + "=" + escape(cd.join(":")) + "; expires=" + ex.toUTCString();
}

// 24:00���N�_�Ƃ��Ĕ�r����
var base = new Date();
base.setTime(pcd[0]);
base.setHours(23);
base.setMinutes(59);
base.setSeconds(59);
if (now > base.getTime()) {
	d.cookie = pci + "=" + escape(pcd.join(":")) + "; expires=" + ex.toUTCString();
} else {
	pcd = ppcd;
}

// HTML�̏�������
var fi = d.querySelector('.frame_inner');
var nfi = fi.cloneNode(true);
nfi.id = "wlw_custom";
var p = nfi.querySelectorAll('.clearfix');
function insert(i, t1, t2) {
	var e = p[0].cloneNode(true);
	var t = e.getElementsByTagName('div');
	t[0].innerHTML = t1;
	t[1].innerHTML = t2;
	nfi.insertBefore(e, p[i]);
}
insert(2,"�s�k��",lc+"<span class=\"font_small\">�s</span>");
insert(2,"����",wr+"%");
insert(4,"Kill Ratio",kr);
function diff(i, t) {
	var iad = Math.round((cd[i]-pcd[i])*100)/100;
	var pm = "�}";
	if (iad>0) {
		pm = "+";
	}
	if (iad<0) {
		pm = """;
		iad = Math.abs(iad);
	}
	t.innerHTML = t.innerHTML + " <span style=\"color:#ff0000;\" class=\"font_small\">(" + pm + iad + ")</span>";
}
var np1 = nfi.querySelectorAll('.block_playdata_01_text');
for (var i = 0; i < 7; i++) {
	diff(i+1, np1[i]);
}
var np2 = nfi.querySelectorAll('.block_playdata_02_text');
for (var i = 0; i < 6; i++) {
	diff(i+8, np2[i]);
}
insert(6, "�S�L���X�g����", awr+"% <span class=\"font_small\">("+awc+"��"+alc+"�s)</span>");
for (var i = 0; i < dci.length; i++) {
	// ��������0�̃L���X�g�͕\�����Ȃ�
	if ((cwca[dci[i]]+clca[dci[i]])>0) {
		insert(6, "<span class=\"font_90\">"+dcn[i]+"</span>", cwra[dci[i]]+"% <span class=\"font_small\">("+cwca[dci[i]]+"��"+clca[dci[i]]+"�s)</span>");		
	}
}

fi.parentNode.replaceChild(nfi, fi);

}