import Database from "better-sqlite3"
import { Organization } from "@/_types";
import db from './db'

const tableName = 'organization'

interface OrganizationRow {
    id: string;
    name: string;
}

const fromRow = (row: OrganizationRow): Organization => {
    return {
        id: row.id,
        name: row.name
    }
}

const toRow = (organiztion: Organization): OrganizationRow => {
    return {
        id: organiztion.id,
        name: organiztion.name
    }
}

export const getOrganizations = (): Organization[] => {
    const statement = db.prepare(`SELECT * FROM ${tableName}`);
    const organizations = statement.all().map((x: OrganizationRow) => fromRow(x));
    return organizations;
};

export const getOrganization = (id: string): Organization | null => {
    try {
        const statement = db.prepare(`SELECT * FROM ${tableName} WHERE id=?`);
        const row = statement.get(id);
    
        if (!row) {
          return null;
        }
    
        return fromRow(row);
      } catch (error) {
        console.error(`Error fetching organization with ID ${id}:`, error);
        throw new Error('Failed to fetch organization.');
      }
};

export const insertOrganization = (organization: Organization): Organization => {
    const row = toRow(organization);
  
    try {
        const statement = db.prepare(`
            INSERT INTO ${tableName} (id, name)
            VALUES (@id, @name)
        `);
        statement.run(row);
        return organization;
    } catch (error) {
      console.error(`Error inserting organization with ID ${organization.id}: ${error}`);
      throw new Error('Failed to insert organization.');
    }
};

export const updateOrganization = (organization: Organization): Organization => {
    const row = toRow(organization);

    try {
        const statement = db.prepare(`
            UPDATE ${tableName}
            SET name = @name
            WHERE id = @id
        `);
        const result = statement.run(row);

        if (result.changes === 0) {
            console.warn(`No organization found with ID ${organization.id} to update.`);
            throw new Error('Organization not found.');
        }

        return organization;
    } catch (error) {
        console.error(`Error updating organization with ID ${organization.id}: ${error}`);
        throw new Error('Failed to update organization.');
    }
};

export const deleteOrganization = (id: string): boolean => {
    try {
        const statement = db.prepare(`
            DELETE FROM ${tableName} 
            WHERE id = @id
        `);
        statement.run({ id });
        return true;
    } catch (error) {
        const message = `Error deleting organization with ID ${id}: ${error}`
        console.error(message);
        throw new Error(message);
    }
};