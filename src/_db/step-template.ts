import Database from "better-sqlite3"
import { StepTemplate } from "@/_types";
import db from './db'

const tableName = 'step_template'

interface StepTemplateRow {
    id: string;
    type: string;
    title: string;
    template: string;
    title_serialized_text_embedding: string;
    project_id: string;
}

const fromRow = (row: StepTemplateRow): StepTemplate => {
    return {
        id: row.id,
        type: row.type,
        title: row.title,
        template: row.title,
        projectId: row.project_id,
        titleTextEmbedding: JSON.parse(row.title_serialized_text_embedding as unknown as string)
    }
}

const toRow = (model: StepTemplate): StepTemplateRow => {
    return {
        id: model.id,
        type: model.type,
        title: model.title,
        template: model.title,
        project_id: model.projectId,
        title_serialized_text_embedding: JSON.stringify(model.titleTextEmbedding)
    }
}

export const getStepTemplates = (): StepTemplate[] => {
    const statement = db.prepare(`SELECT * FROM ${tableName}`);
    const models = statement.all().map((x: StepTemplateRow) => fromRow(x));
    return models;
};

export const getStepTemplate = (id: string): StepTemplate | null => {
    try {
        const statement = db.prepare(`SELECT * FROM ${tableName} WHERE id=?`);
        const row = statement.get(id);
        if (!row) {
          return null;
        }
        return fromRow(row);
      } catch (error) {
        const message = `Error selecting ${tableName} with id: ${id}.`
        console.error(message, error);
        throw new Error(message);
      }
};

export const insertStepTemplate = (model: StepTemplate): StepTemplate => {
    const row = toRow(model);
  
    try {
        const statement = db.prepare(`
            INSERT INTO ${tableName} (
                id,
                type,
                title,
                template,
                project_id,
                title_serialized_text_embedding
            )
            VALUES (
                @id,
                @type,
                @title,
                @template,
                @project_id,
                @title_serialized_text_embedding
            )
        `);
        statement.run(row);
        return model;
    } catch (error) {
        const message = `Error inserting into ${tableName} with id: ${model.id}`
      console.error(message, error);
      throw new Error(message);
    }
};

export const updateStepTemplate = (model: StepTemplate): StepTemplate => {
    const row = toRow(model);

    try {
        const statement = db.prepare(`
            UPDATE ${tableName}
            SET 
                id = @id,
                type = @type,
                title = @title,
                template = @template,
                project_id = @project_id,
                title_serialized_text_embedding = @title_serialized_text_embedding
            WHERE id = @id
        `);
        const result = statement.run(row);

        if (result.changes === 0) {
            const message = `No ${tableName}  record found with id ${model.id} to update.`
            console.error(message);
            throw new Error(message);
        }

        return model;
    } catch (error) {
        const message = `Error updating ${tableName} record with id ${model.id}`
        console.error(message, error);
        throw new Error(message);
    }
};

export const deleteStepTemplate = (id: string): boolean => {
    try {
        const statement = db.prepare(`
            DELETE FROM ${tableName} 
            WHERE id = @id
        `);
        statement.run({ id });
        return true;
    } catch (error) {
        const message = `Error deleting record in ${tableName} with id ${id}`
        console.error(message, error);
        throw new Error(message);
    }
};