<div class="add-pet-form">
	<form>
		<h1>Name</h1>
		<input type="text" placeholder="ENTER THE NAME OF THE PET"/>
		<h1>Species</h1>
		<div>
			<input type="radio" id="dog" name="species" value="dog"/>
			<label for="dog">DOG</label>
			<input type="radio" id="cat" name="species" value="cat"/>
			<label for="cat">CAT</label>
			<input type="radio" id="rabbit" name="species" value="rabbit"/>
			<label for="rabbit">RABBIT</label>
		</div>
		
		<h1>Breed</h1>
		<input type="text" placeholder="ENTER THE BREED"/>

		<h1>Date of birth</h1>	
		<input type="text" placeholder="ENTER THE DATE !FIX ME"/>
		
		<h1>Weight</h1>
		<div>
			<input class="weight-input" type="text" placeholder="ENTER THE NAME OF THE PET"/>
			<span class="weight-unit">KG</span>
		</div>
		
		<h1>Blood group</h1>
		<input type="text" placeholder="ENTER THE BLOOD GROUP"/>
		
		<h1>Notes</h1>
		<input type="text" placeholder="ENTER ANY MEDICAL CONDITIONS"/>

		<h1>Upload a picture</h1>
		<input type="file" id="image-upload" accept="image/png, image/jpeg"/>
		<label for="image-upload" class="upload-button">
			<img src="/upload.svg" alt="upload icon"/>
			Upload
		</label>
		<button type="submit"><img src="/done.svg" alt="edit"/>Done</button>
	</form>
</div>
<style>
	h1 {
		font-size: var(--font-xl);
		font-weight: 500;
		color: var(--color-text-primary);
	}
	.add-pet-form {
		height: 85%;
		padding-bottom: 1rem;
		overflow-y: auto;
		-ms-overflow-style: none;
		scrollbar-width: none;
	}
	.add-pet-form::-webkit-scrollbar{
		display: none;
	}
	form {
		display: flex;
		color: var(--color-text-secondary);
		flex-direction: column;
		gap: 1rem;
		font-family: var(--font-heading);
	}
	form input[type="radio"] {
		display: none;
	}
	form input[type="radio"]:checked + label {
		background-color: var(--color-disabled);
		border-color: var(--color-text-primary);
		color: var(--color-text-primary);
	}
	form label {
		border-color: var(--color-text-secondary);
		border-radius: 20px;
		border-width: 2px;
		padding: 0.3rem;
		width: 35%;
		text-align: center;
		font-size: 12px;
	}
	form input[type="text"] {
		border-radius: var(--radius-medium);
		border-color: var(--color-text-primary);
		border-width: 2px;
		padding: 0.5rem;
		font-size: var(--font-xs);
		width: 100%;
	}
	form input[type="text"]::placeholder {
		color: var(--color-text-secondary);	
	}
	form div {
		display: flex;
		justify-content: space-between;
		gap: 0.5rem;
	}
	.weight-unit {
		border-radius: var(--radius-medium);
		border-color: var(--color-text-primary);
		border-width: 2px;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 30%;
		font-size: var(--font-s);
		color: var(--color-text-primary);
		font-weight: 400;
	}
	form input[type="file"] {
		display: none;
	} 
	.upload-button {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 0.3rem;
		border-radius:  var(--radius-medium);
		border-width: 2px;
		border-color: var(--color-text-primary);
		font-size: var(--font-m);
		flex-basis: 13rem;
		width: 100%;
	}
	form button {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 0.3rem;
		border-radius:  20px;
		border-width: 2px;
		border-color: var(--color-text-primary);
		padding: 0.2rem 0rem;
		background-color: var(--color-enabled);
		width: 100%;
		font-family: var(--font-title);
		font-size: var(--font-l);
		font-weight: 500;
		color: var(--color-text-primary);
	}
</style>