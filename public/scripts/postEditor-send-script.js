window.addEventListener('load', () => {
	function checkData() {
		const formData = new FormData(postEditorForm);

		if (
			formData.get('title').length != 0 &&
			formData.get('debunk_desc').length != 0 &&
			formData.get('fake_desc') != 0
		) {
			console.log('success');
			console.log(Array.from(formData.entries()));
			postEditorForm.submit();
			//formData.send();
		} else {
			console.log('Error');
		}
	}
	const postEditorForm = document.getElementById('postEditorForm');
	postEditorForm.addEventListener('submit', (event) => {
		event.preventDefault();
		checkData();
	});
});
