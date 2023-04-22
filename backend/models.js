const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

mongoose.set('strictQuery', false);
mongoose.connect(process.env.DATABASE_URL)
.then(result => {
	console.log('connected to MongoDB')
})
.catch((error) => {
	console.log('error connecting to MongoDB:', error.message)
});

const locationSchema = new mongoose.Schema({
  latitude: {
    type: Number,
    min: -90,
    max: 90,
    required: true,
  },
  longitude: {
    type: Number,
    min: -180,
    max: 180,
    required: true,
  },
});

const reviewSchema = new mongoose.Schema({
	_id: ObjectId,
	user_id: ObjectId,
	review: String,
	rating: {
		type: Number,
		min: 0,
		max: 5,
		required: true
	}
});

const clinicSchema = new mongoose.Schema({
	_id: ObjectId,
	name: String,
	address: String,
	opening_hour: Date,
	closing_hour: Date,
	image_uri: String,
	contact: {
		type: String,
		validate: {
			validator: function(v) {
				return /^[+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,4}[-\s\.]?[0-9]{4,6}$/im.test(v);
			},
			message: props => `${props.value} is not a valid phone number!`
		}
	},
	location: locationSchema,
	reviews: [reviewSchema]
});

const articleSchema = new mongoose.Schema({
	_id: ObjectId,
	tag: String,
	title: String,
	content: String,
	image_uri: {
    type: String,
    validate: {
      validator: (value) => {
        if (!value) {
          return true;
        }
        return value.length <= 16000000;
      },
      message: 'Image URI must be less than or equal to 16MB in size',
    },
  },
});

const appointmentSchema = new mongoose.Schema({
	_id: ObjectId,
	date_time: Date,
	clinic_id: ObjectId,
	doctor_name: String,
	completed: Boolean,
	location: locationSchema
});

const petSchema = new mongoose.Schema({
  _id: ObjectId,
  name: String,
  dob: Date,
  species: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
    min: 0,
    required: true,
  },
  breed: String,
  bloodGroup: String,
  notes: String,
  image_uri: {
    type: String,
    validate: {
      validator: (value) => {
        if (!value) {
          return true;
        }
        return value.length <= 16000000;
      },
      message: 'Image URI must be less than or equal to 16MB in size',
    },
  },
  appointments: [appointmentSchema],
});


const requestSchema = new mongoose.Schema({
	_id: ObjectId,
	user_id: ObjectId,
	name: String,
	contact: {
		type: String,
		validate: {
			validator: function(v) {
				return /^[+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,4}[-\s\.]?[0-9]{4,6}$/im.test(v);
			},
			message: props => `${props.value} is not a valid phone number!`
		}
	},
	note: String,
	image_uri: {
    type: String,
    validate: {
      validator: (value) => {
        if (!value) {
          return true;
        }
        return value.length <= 16000000;
      },
      message: 'Image URI must be less than or equal to 16MB in size',
    },
  },
	date_time_missing: Date,
	last_seen: String,
	last_seen_location: locationSchema,
});

const userSchema = new mongoose.Schema({
	_id: ObjectId,
	name: String,
	email: String,
	phone: {
		type: String,
		validate: {
			validator: function(v) {
				return /^[+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,4}[-\s\.]?[0-9]{4,6}$/im.test(v);
			},
			message: props => `${props.value} is not a valid phone number!`
		}
	},
	password: String,
	pets: [petSchema],
	saved_articles: [ObjectId]
});

module.exports = {
	Review: mongoose.model('Review', reviewSchema),
	Clinic: mongoose.model('Clinic', clinicSchema),
	Appointment: mongoose.model('Appointment', appointmentSchema),
	User: mongoose.model('User', userSchema),
	Pet: mongoose.model('Pet', petSchema),
	Article: mongoose.model('Article', articleSchema),
	Request: mongoose.model('Request', requestSchema),
	Location: mongoose.model('Location', locationSchema),
	db: mongoose,
}