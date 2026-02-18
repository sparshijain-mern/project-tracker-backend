const createProjectStatusType = `
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'project_status') THEN
    CREATE TYPE project_status AS ENUM (
      'active',
      'on_hold',
      'completed'
    );
  END IF;
END$$;
`;

const createProjectsTable = `
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(150) NOT NULL,
  description TEXT,
  client_name VARCHAR(150) NOT NULL,
  status project_status NOT NULL DEFAULT 'active',
  start_date DATE NOT NULL,
  end_date DATE,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  deleted_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

module.exports = {
	createProjectStatusType,
	createProjectsTable
};
