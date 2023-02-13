import { ObjectId } from 'mongodb';
import { model, Schema } from 'mongoose';
import User from './userModel.js';

// const projectsSchema = new Schema({
//   userId: { type: Schema.Types.ObjectId, ref: 'User' },
//   projects: [{ type: Schema.Types.ObjectId, ref: 'Project' }]
// });

const singleProjectData = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  projects: {
    subtitle: { type: String, default: 'Latest Project' },
    title: { type: String, default: 'Wall of wonder' },
    description: {
      type: String,
      default:
        'Description of the project. This should be fairly concise while also describing the key components that you developed or worked on. It can be as long as you need it to be but should at least be a few sentences long. Be sure to add link to the project.',
    },
    secondSubtitle: { type: String, default: 'Technologies used include:' },
    list: { type: String, default: 'HTML | CSS | JAVASCRIPT' },
    image: {
      type: String,
      default:
        'https://assets.codepen.io/296057/fem-gettingstartedcss-ch5-1.png',
    },
    linkToWebsite: {
      type: String,
      default: 'Add here link to your website',
    },
    linkValue: {
      type: String,
      default: 'Go to project website',
    },
  },
});

//const ProjectsData = model('Project', projectsSchema);

const SingleProjectData = model('SingleProject', singleProjectData);

export default SingleProjectData;
