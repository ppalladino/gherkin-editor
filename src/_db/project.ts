import Database from "better-sqlite3"
import { Project } from "@/_types";
import db from './db'

const tableName = 'project'
const modelName = 'project'

interface ProjectRow {
    id: string;
    name: string;
    organization_id: string;
}

const fromRow = (row: ProjectRow): Project => {
    return {
        id: row.id,
        name: row.name,
        organizationId: row.organization_id
    }
}

const toRow = (model: Project): ProjectRow => {
    return {
        id: model.id,
        name: model.name,
        organization_id: model.organizationId
    }
}

export const getProjects = (): Project[] => {
    const statement = db.prepare(`SELECT * FROM ${tableName}`);
    const models = statement.all().map((x: ProjectRow) => fromRow(x));
    return models;
};

export const getProject = (id: string): Project | null => {
    try {
        const statement = db.prepare(`SELECT * FROM ${tableName} WHERE id=?`);
        const row = statement.get(id);
    
        if (!row) {
          return null;
        }
    
        return fromRow(row);
      } catch (error) {
        const message = `Error fetching ${modelName} with ID ${id}`
        console.error(message, error);
        throw new Error(message);
      }
};

export const insertProject = (model: Project): Project => {
    const row = toRow(model);
  
    try {
        const statement = db.prepare(`
            INSERT INTO ${tableName} (id, name, organization_id)
            VALUES (@id, @name, @organization_id)
        `);
        console.log("!!!!!! YO", row)
        statement.run(row);
        return model;
    } catch (error) {
        const message = `Error inserting ${modelName} with ID ${model.id}: ${error}`
        console.error(message);
        throw new Error(message);
    }
};

export const updateProject = (model: Project): Project => {
    const row = toRow(model);

    try {
        const statement = db.prepare(`
            UPDATE ${tableName}
            SET 
                name = @name,
                organization_id = @organization_id
            WHERE id = @id
        `);
        const result = statement.run(row);

        if (result.changes === 0) {
            const message = `No ${modelName} found with ID ${model.id} to update.`
            console.warn(message);
            throw new Error(message);
        }

        return model;
    } catch (error) {
        const message = `Error updating ${modelName} with ID ${model.id}: ${error}`
        console.error(message);
        throw new Error(message);
    }
};

export const deleteProject = (id: string): boolean => {
    try {
        const statement = db.prepare(`
            DELETE FROM ${tableName} 
            WHERE id = @id
        `);
        statement.run({ id });
        return true;
    } catch (error) {
        const message = `Error deleting ${modelName} with ID ${id}: ${error}`
        console.error(message);
        throw new Error(message);
    }
};