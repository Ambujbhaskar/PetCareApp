<script>
	export let data;
</script>

<div class="pet-profile-body">
	<div class="pet-profile">
		<img src={data.image} alt="image of {data.petName}"/>
		{data.petName}
	</div>	

	<div class="pet-info">
		<div>
			<span>
				<img src="/7.svg" alt="age"/>
			</span>	
			Months
		</div>
		<div>
			<span>
				<img src="/cat.svg" alt="age"/>
			</span>	
			Persian
		</div>
	</div>

	<div class="pet-medical-info">
		<h1>Medical Information</h1>
		Weight - {data.weight}<br/>
		Blood group - {data.bloodGroup}<br/>
		Notes - {data.notes}<br/>
	</div>

	<button>
		<img src="/edit.svg" alt="edit"/>
		Edit
	</button>
</div>
<style>
	h1 {
		font-family: var(--font-heading);
		font-size: var(--font-xl);
	}
	.pet-profile-body {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		gap: 1rem;
	}
	.pet-profile {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		gap: 0.5rem;
		border-color: var(--color-text-primary);
		border-width: 1px;
		border-radius: var(--radius-small);
		background-color: var(--color-disabled);
		padding: 0.8rem;
		font-size: var(--font-xl);
		font-weight: bold;
	}
	.pet-profile img {
		border-radius: var(--radius-small);
		border-width: 1px;
		border-color: var(--color-text-primary);
		width: 100%;
		height: 13rem;
		object-fit: cover;
	}
	.pet-info {
		display: flex;
		justify-content: space-between;
		gap: 1rem
	}
	.pet-info div {
		flex-grow: 1;
		display: flex;
		align-items: center;
		gap: 5px;
		border-color: var(--color-text-primary);
		border-width: 1px;
		border-radius: var(--radius-small);
		padding: 0.8rem;
		background-color: var(--color-enabled);
		font-size: var(--font-xl);
		font-weight: 500;
	}
	.pet-info div span {
		border-color: var(--color-text-primary);
		border-width: 1px;
		border-radius: 4px;
		padding: 0.5rem;
		background-color: var(--color-background);
	}
	.pet-medical-info {
		border-color: var(--color-text-primary);
		border-width: 1px;
		border-radius: var(--radius-large);
		padding: 0.8rem;
		font-family: var(--font-heading);
		font-size: var(--font-m);
	}
	button {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 0.5rem;
		border-color: var(--color-text-primary);
		border-width: 1px;
		border-radius: 20px;
		padding: 0.2rem 0rem;
		background-color: var(--color-enabled);
		font-family: var(--font-heading);
		font-size: 20px;
		font-weight: 400;
		color: var(--color-text-primary);
	}
</style>