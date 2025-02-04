import { StepToken } from "@/_types";
import db from './db'

const tableName = 'step_token'

interface StepTokenRow {
    id: string;
    key: string;
    project_id: string;
}

const fromRow = (row: StepTokenRow): StepToken => {
    return {
        id: row.id,
        key: row.key,
        projectId: row.project_id,
    }
}

const toRow = (model: StepToken): StepTokenRow => {
    return {
        id: model.id,
        key: model.key,
        project_id: model.projectId,
    }
}

export const getStepTokens = (): StepToken[] => {
    const statement = db.prepare(`SELECT * FROM ${tableName}`);
    const models = statement.all().map((x: StepTokenRow) => fromRow(x));
    return models;
};

export const getStepToken = (id: string): StepToken | null => {
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

export const insertStepToken = (model: StepToken): StepToken => {
    const row = toRow(model);
  
    try {
        const statement = db.prepare(`
            INSERT INTO ${tableName} (
                id,
                key,
                project_id
            )
            VALUES (
                @id,
                @key,
                @project_id
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

export const updateStepToken = (model: StepToken): StepToken => {
    const row = toRow(model);

    try {
        const statement = db.prepare(`
            UPDATE ${tableName}
            SET 
                id = @id,
                key = @key,
                project_id = @project_id
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

export const deleteStepToken = (id: string): boolean => {
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