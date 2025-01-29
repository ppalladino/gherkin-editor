import Database from 'better-sqlite3';
import path from 'path';
import { StepTemplate, StepTokenOptions, TokenStatus } from '../_types';
import { v4 as uuidv4 } from 'uuid';

const dbPath = path.resolve(process.cwd(), 'gherkin-editor-database.db');
const db = new Database(dbPath, { verbose: console.log });
db.pragma('journal_mode = WAL');

const initDb = (db: Database) => {
    db.prepare(`
        CREATE TABLE IF NOT EXISTS step_templates (
            id TEXT PRIMARY KEY,
            type TEXT,
            title TEXT,
            template TEXT,
            textEmbedding TEXT
        );
    `).run();

    console.log('Table created: step_templates')

    db.prepare(`
        CREATE TABLE IF NOT EXISTS step_token_options (
            id TEXT PRIMARY KEY,
            key TEXT,
            options TEXT
        )
    `).run()

    console.log('Table created: step_token_options');

    // 2. Check if the table is empty
    const stepTokenOptionsCountQuery = db.prepare('SELECT COUNT(*) AS count FROM step_token_options');
    const stepTokenOptionsCount = stepTokenOptionsCountQuery.get();

    if (stepTokenOptionsCount.count === 0) {
        console.log('step_token_options table is empty. Proceeding to seed data...');
        seedDataStepTokenOptions(db);
    } else {
        console.log('step_token_options table already has data. Skipping seeding.');
    }

// 3. Function to seed data
    function seedDataStepTokenOptions(db: Database) {
    // Define seed users
        const seedData = [
            {
                id: uuidv4(), 
                key: "roles", 
                options: [
                    {status: TokenStatus.PUBLISHED, value:"UNAUTHORIZED"}, 
                    {status: TokenStatus.PUBLISHED, value:"ADMIN"}, 
                    {status: TokenStatus.PUBLISHED, value:"EDITOR"}, 
                    {status: TokenStatus.PUBLISHED, value:"VIEWER"}
                ]},
            {
                id: uuidv4(), 
                key: "routes", options: [
                    {status: TokenStatus.PUBLISHED, value:"HOME"}, 
                    {status: TokenStatus.PUBLISHED, value:"STANDARD_SEARCH"}, 
                    {status: TokenStatus.PUBLISHED, value:"CONTACT"}
                ]},
            {
                id: uuidv4(), 
                key: "step-preconditions", 
                options: [
                    {status: TokenStatus.PUBLISHED, value:"GIVEN"}, 
                    {status: TokenStatus.PUBLISHED, value:"AND"}
                ]},
            {
                id: uuidv4(), 
                key: "step-actions", options: [
                    {status: TokenStatus.PUBLISHED, value:"WHEN"}, 
                    {status: TokenStatus.PUBLISHED, value:"AND"}
                ]},
            {
                id: uuidv4(), 
                key: "step-results", 
                options: [
                    {status: TokenStatus.PUBLISHED, value:"THEN"}, 
                    {status: TokenStatus.PUBLISHED, value:"AND"}
                ]},
            {
                id: uuidv4(), 
                key: "component-ids", 
                options: [
                    {status: TokenStatus.PUBLISHED, value:"STANDARD_SEARCH_VALUE"},
                    {status: TokenStatus.PUBLISHED, value:"STANDARD_SEARCH_SUBMIT"},
                    {status: TokenStatus.PUBLISHED, value:"STANDARD_SEARCH_RESULTS"},
                    {status: TokenStatus.PUBLISHED, value:"STANDARD_EDITOR_TITLE"},
                    {status: TokenStatus.PUBLISHED, value:"STANDARD_EDITOR_SUBTITLE"}
            ]
            }
        ];

        // Prepare the insert statement
        const insert = db.prepare('INSERT INTO step_token_options (id, key, options) VALUES (?, ?, ?)');

        // Use a transaction for efficient bulk inserts
        const insertMany = db.transaction((options: StepTokenOptions[]) => {
            for (const option of options) {
                insert.run(option.id, option.key, JSON.stringify(option.options));
            }
        });

        // Execute the transaction
        insertMany(seedData);
        console.log('Seed data inserted successfully.');
    }
}

initDb(db);
export default db;

export const getAllStepTemplates = (): StepTemplate[] => {
    const statement = db.prepare('SELECT * FROM step_templates');
    const stepTemplates = statement.all() as StepTemplate[];

    // Convert the serialized textEmbedding back into a number[] immutably
    const updatedStepTemplates = stepTemplates.map((stepTemplate) => ({
        ...stepTemplate,
        textEmbedding: JSON.parse(stepTemplate.textEmbedding as unknown as string), // Immutable update
    }));

    return updatedStepTemplates;
};

export const getStepTemplate = (id: string): StepTemplate => {
    const statement = db.prepare('SELECT * FROM step_templates WHERE id = ?');
    const stepTemplate = statement.get(id) as StepTemplate;

    // Convert the serialized textEmbedding back into a number[] immutably
    const updatedStepTemplate = {
        ...stepTemplate,
        textEmbedding: JSON.parse(stepTemplate.textEmbedding as unknown as string), // Immutable update
    };

    return updatedStepTemplate;
};

export const insertStepTemplate = (stepTemplate: StepTemplate) => {
    // Serialize textEmbedding to a string
    const serializedStepTemplate = {
        ...stepTemplate,
        textEmbedding: JSON.stringify(stepTemplate.textEmbedding),
    };

    const statement = db.prepare(`
        INSERT INTO step_templates (id, type, title, template, textEmbedding)
        VALUES (@id, @type, @title, @template, @textEmbedding)
    `);

    return statement.run(serializedStepTemplate);
};

export const updateStepTemplate = (stepTemplate: StepTemplate) => {
    // Serialize textEmbedding to a string
    const serializedStepTemplate = {
        ...stepTemplate,
        textEmbedding: JSON.stringify(stepTemplate.textEmbedding),
    };

    const statement = db.prepare(`
        UPDATE step_templates 
        SET 
            type = @type, 
            title = @title, 
            template = @template,
            textEmbedding = @textEmbedding
        WHERE id = @id
    `);

    return statement.run(serializedStepTemplate);
};

export const deleteAllStepTemplates = () => {
    // Delete all rows from the step_templates table
    const statement = db.prepare('DELETE FROM step_templates');
    statement.run(); // Execute the statement
};

export const getAllStepTokenOpions = (): StepTokenOptions[] => {
    const statement = db.prepare('SELECT * FROM step_token_options');
    const stepTokenOptions = statement.all() as StepTokenOptions[];

    // Convert the serialized textEmbedding back into a number[] immutably
    const updatedStepTokenOptions = stepTokenOptions.map((stepTokenOption) => ({
        ...stepTokenOption,
        options: JSON.parse(stepTokenOption.options as unknown as string), // Immutable update
    }));

    return updatedStepTokenOptions;
};

export const getStepTokenOptions = (id: string): StepTokenOptions => {
    const statement = db.prepare('SELECT * FROM step_token_options WHERE id = ?');
    const stepTokenOptions = statement.get(id) as StepTokenOptions;

    // Convert the serialized textEmbedding back into a number[] immutably
    const updatedStepTokenOptions = {
        ...stepTokenOptions,
        options: JSON.parse(stepTokenOptions.options as unknown as string), // Immutable update
    };

    return updatedStepTokenOptions;
};

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
