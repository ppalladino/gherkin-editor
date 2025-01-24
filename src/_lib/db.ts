import Database from 'better-sqlite3';
import path from 'path';
import { StepTemplate } from '../_types';

const dbPath = path.resolve(process.cwd(), 'gherkin-editor-database.db');
const db = new Database(dbPath, { verbose: console.log });
db.pragma('journal_mode = WAL');

const initDb = (db) => {
    db.prepare(`
        CREATE TABLE IF NOT EXISTS step_templates (
            id TEXT PRIMARY KEY,
            type TEXT,
            title TEXT,
            template TEXT,
            textEmbedding TEXT
        );
    `).run();

    console.log('Database initialized (tables created).');
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

export const deleteAllStepTemplates = () => {
    // Delete all rows from the step_templates table
    const statement = db.prepare('DELETE FROM step_templates');
    statement.run(); // Execute the statement
}

// export const getStepTemplates = (): StepTemplate[] => {
//     const statement = db.prepare(`
//         SELECT id, type, title, template, textEmbedding
//         FROM step_templates
//     `);

//     const rows = statement.all();

//     // Deserialize textEmbedding back into a number[]
//     return rows.map((row) => ({
//         ...row,
//         textEmbedding: JSON.parse(row.textEmbedding),
//     }));
// };
