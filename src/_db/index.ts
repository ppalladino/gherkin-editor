export * from "./db"
export * from  "./organization"

// const initDb = (db: Database) => {

//     // 2. Check if the table is empty
//     const stepTokenOptionsCountQuery = db.prepare('SELECT COUNT(*) AS count FROM step_token_options');
//     const stepTokenOptionsCount = stepTokenOptionsCountQuery.get();

//     if (stepTokenOptionsCount.count === 0) {
//         console.log('step_token_options table is empty. Proceeding to seed data...');
//         seedDataStepTokenOptions(db);
//     } else {
//         console.log('step_token_options table already has data. Skipping seeding.');
//     }

//     // 3. Function to seed data
//     function seedDataStepTokenOptions(db: Database) {
//     // Define seed users
//         const seedData = [
//             {
//                 id: uuidv4(), 
//                 key: "roles", 
//                 options: [
//                     {id: uuidv4(), status: TokenStatus.PUBLISHED, textEmbedding: [], value:"UNAUTHORIZED"}, 
//                     {id: uuidv4(), status: TokenStatus.PUBLISHED, textEmbedding: [], value:"ADMIN"}, 
//                     {id: uuidv4(), status: TokenStatus.PUBLISHED, textEmbedding: [], value:"EDITOR"}, 
//                     {id: uuidv4(), status: TokenStatus.PUBLISHED, textEmbedding: [], value:"VIEWER"}
//                 ]},
//             {
//                 id: uuidv4(), 
//                 key: "routes", options: [
//                     {id: uuidv4(), status: TokenStatus.PUBLISHED, textEmbedding: [], value:"HOME"}, 
//                     {id: uuidv4(), status: TokenStatus.PUBLISHED, textEmbedding: [], value:"STANDARD_SEARCH"}, 
//                     {id: uuidv4(), status: TokenStatus.PUBLISHED, textEmbedding: [], value:"CONTACT"}
//                 ]},
//             {
//                 id: uuidv4(), 
//                 key: "step-preconditions", 
//                 options: [
//                     {id: uuidv4(), status: TokenStatus.PUBLISHED, textEmbedding: [], value:"GIVEN"}, 
//                     {id: uuidv4(), status: TokenStatus.PUBLISHED, textEmbedding: [], value:"AND"}
//                 ]},
//             {
//                 id: uuidv4(), 
//                 key: "step-actions", options: [
//                     {id: uuidv4(), status: TokenStatus.PUBLISHED, textEmbedding: [], value:"WHEN"}, 
//                     {id: uuidv4(), status: TokenStatus.PUBLISHED, textEmbedding: [], value:"AND"}
//                 ]},
//             {
//                 id: uuidv4(), 
//                 key: "step-results", 
//                 options: [
//                     {id: uuidv4(), status: TokenStatus.PUBLISHED, textEmbedding: [], value:"THEN"}, 
//                     {id: uuidv4(), status: TokenStatus.PUBLISHED, textEmbedding: [], value:"AND"}
//                 ]},
//             {
//                 id: uuidv4(), 
//                 key: "component-ids", 
//                 options: [
//                     {id: uuidv4(), status: TokenStatus.PUBLISHED, textEmbedding: [], value:"STANDARD_SEARCH_VALUE"},
//                     {id: uuidv4(), status: TokenStatus.PUBLISHED, textEmbedding: [], value:"STANDARD_SEARCH_SUBMIT"},
//                     {id: uuidv4(), status: TokenStatus.PUBLISHED, textEmbedding: [], value:"STANDARD_SEARCH_RESULTS"},
//                     {id: uuidv4(), status: TokenStatus.PUBLISHED, textEmbedding: [], value:"STANDARD_EDITOR_TITLE"},
//                     {id: uuidv4(), status: TokenStatus.PUBLISHED, textEmbedding: [], value:"STANDARD_EDITOR_SUBTITLE"}
//             ]
//             }
//         ];

//         // Prepare the insert statement
//         const insert = db.prepare('INSERT INTO step_token_options (id, key, options) VALUES (?, ?, ?)');

//         // Use a transaction for efficient bulk inserts
//         const insertMany = db.transaction((options: StepTokenOptions[]) => {
//             for (const option of options) {
//                 insert.run(option.id, option.key, JSON.stringify(option.options));
//             }
//         });

//         // Execute the transaction
//         insertMany(seedData);
//         console.log('Seed data inserted successfully.');
//     }
// }

// // initDb(db);




// export const getAllStepTemplates = (): StepTemplate[] => {
//     const statement = db.prepare('SELECT * FROM step_templates');
//     const stepTemplates = statement.all() as StepTemplate[];

//     // Convert the serialized textEmbedding back into a number[] immutably
//     const updatedStepTemplates = stepTemplates.map((stepTemplate) => ({
//         ...stepTemplate,
//         textEmbedding: JSON.parse(stepTemplate.textEmbedding as unknown as string), // Immutable update
//     }));

//     return updatedStepTemplates;
// };

// export const getStepTemplate = (id: string): StepTemplate => {
//     const statement = db.prepare('SELECT * FROM step_templates WHERE id = ?');
//     const stepTemplate = statement.get(id) as StepTemplate;

//     // Convert the serialized textEmbedding back into a number[] immutably
//     const updatedStepTemplate = {
//         ...stepTemplate,
//         textEmbedding: JSON.parse(stepTemplate.textEmbedding as unknown as string), // Immutable update
//     };

//     return updatedStepTemplate;
// };

// export const insertStepTemplate = (stepTemplate: StepTemplate) => {
//     // Serialize textEmbedding to a string
//     const serializedStepTemplate = {
//         ...stepTemplate,
//         textEmbedding: JSON.stringify(stepTemplate.textEmbedding),
//     };

//     const statement = db.prepare(`
//         INSERT INTO step_templates (id, type, title, template, textEmbedding)
//         VALUES (@id, @type, @title, @template, @textEmbedding)
//     `);

//     return statement.run(serializedStepTemplate);
// };

// export const updateStepTemplate = (stepTemplate: StepTemplate) => {
//     // Serialize textEmbedding to a string
//     const serializedStepTemplate = {
//         ...stepTemplate,
//         textEmbedding: JSON.stringify(stepTemplate.textEmbedding),
//     };

//     const statement = db.prepare(`
//         UPDATE step_templates 
//         SET 
//             type = @type, 
//             title = @title, 
//             template = @template,
//             textEmbedding = @textEmbedding
//         WHERE id = @id
//     `);

//     return statement.run(serializedStepTemplate);
// };

// export const deleteAllStepTemplates = () => {
//     // Delete all rows from the step_templates table
//     const statement = db.prepare('DELETE FROM step_templates');
//     statement.run(); // Execute the statement
// };

// export const getAllStepTokenOpions = (): StepTokenOptions[] => {
//     const statement = db.prepare('SELECT * FROM step_token_options');
//     const stepTokenOptions = statement.all() as StepTokenOptions[];

//     // Convert the serialized textEmbedding back into a number[] immutably
//     const updatedStepTokenOptions = stepTokenOptions.map((stepTokenOption) => ({
//         ...stepTokenOption,
//         options: JSON.parse(stepTokenOption.options as unknown as string), // Immutable update
//     }));

//     return updatedStepTokenOptions;
// };

// export const getStepTokenOptions = (id: string): StepTokenOptions => {
//     const statement = db.prepare('SELECT * FROM step_token_options WHERE id = ?');
//     const stepTokenOptions = statement.get(id) as StepTokenOptions;

//     // Convert the serialized textEmbedding back into a number[] immutably
//     const updatedStepTokenOptions = {
//         ...stepTokenOptions,
//         options: JSON.parse(stepTokenOptions.options as unknown as string), // Immutable update
//     };

//     return updatedStepTokenOptions;
// };


