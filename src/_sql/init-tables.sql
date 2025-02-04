CREATE TABLE IF NOT EXISTS organization (
    id TEXT PRIMARY KEY,
    name TEXT
);

CREATE TABLE IF NOT EXISTS project (
    id TEXT PRIMARY KEY,
    name TEXT,
    organization_id TEXT,
    FOREIGN KEY (organization_id) REFERENCES organization(id)
    ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS step_template (
    id TEXT PRIMARY KEY,
    type TEXT,
    title TEXT,
    template TEXT,
    title_serialized_text_embedding TEXT,
    project_id TEXT,
    FOREIGN KEY (project_id) REFERENCES project(id)
    ON DELETE CASCADE

);

CREATE TABLE IF NOT EXISTS step_token (
    id TEXT PRIMARY KEY,
    key TEXT,
    project_id TEXT,
    FOREIGN KEY (project_id) REFERENCES project(id)
    ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS step_token_option (
    id TEXT PRIMARY KEY,
    status TEXT,
    value TEXT,
    value_serialized_text_embedding TEXT,
    step_token_id,
    FOREIGN KEY (step_token_id) REFERENCES step_token(id)
    ON DELETE CASCADE
);