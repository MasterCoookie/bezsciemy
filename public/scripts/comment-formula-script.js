function comment() {
	if (document.getElementById('comment-form').style.display === 'block') {
		document.getElementById('comment-form').style.display = 'none';
	} else {
		document.getElementById('comment-form').style.display = 'block';
	}
}

function reply(e) {
	if (
		document.getElementById('commentEditor-' + e.target.form.id).style
			.display === 'block'
	) {
		document.getElementById('commentEditor-' + e.target.form.id).style.display =
			'none';
	} else {
		document.getElementById('commentEditor-' + e.target.form.id).style.display =
			'block';
	}
}
