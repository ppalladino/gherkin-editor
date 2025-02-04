import { StepTokenOption } from "@/_types";
import db from './db'

const tableName = 'step_token_option'

interface StepTokenOptionRow {
    id: string;
    status: string;
    step_token_id: string;
    value: string;
    value_serialized_text_embedding: string;
}

const fromRow = (row: StepTokenOptionRow): StepTokenOption => {
    return {
        id: row.id,
        status: row.status,
        stepTokenId: row.step_token_id,
        value: row.value,
        valueTextEmbedding: JSON.parse(row.value_serialized_text_embedding as unknown as string)
    }
}

const toRow = (model: StepTokenOption): StepTokenOptionRow => {
    return {
        id: model.id,
        status: model.status,
        step_token_id: model.stepTokenId,
        value: model.value,
        value_serialized_text_embedding: JSON.stringify(model.valueTextEmbedding)
    }
}

export const getStepTokenOptions = (): StepTokenOption[] => {
    const statement = db.prepare(`SELECT * FROM ${tableName}`);
    const models = statement.all().map((x: StepTokenOptionRow) => fromRow(x));
    return models;
};

export const getStepTokenOption = (id: string): StepTokenOption | null => {
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

export const insertStepTokenOption = (model: StepTokenOption): StepTokenOption => {
    const row = toRow(model);
  
    try {
        const statement = db.prepare(`
            INSERT INTO ${tableName} (
                id,
                status,
                step_token_id,
                value,
                value_serialized_text_embedding
            )
            VALUES (
                @id,
                @status,
                @step_token_id,
                @value,
                @value_serialized_text_embedding
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

export const updateStepTokenOption = (model: StepTokenOption): StepTokenOption => {
    const row = toRow(model);

    try {
        const statement = db.prepare(`
            UPDATE ${tableName}
            SET 
                id = @id,
                status = @status,
                step_token_id = @step_token_id,
                value = @value,
                value_serialized_text_embedding = @value_serialized_text_embedding
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

export const deleteStepTokenOption = (id: string): boolean => {
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