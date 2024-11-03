<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20241024123229 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        // $this->addSql('ALTER TABLE method ALTER id DROP DEFAULT');
        // $this->addSql('ALTER TABLE method ALTER icon TYPE VARCHAR(255)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        // $this->addSql('CREATE SCHEMA public');
        // $this->addSql('CREATE SEQUENCE method_id_seq');
        // $this->addSql('SELECT setval(\'method_id_seq\', (SELECT MAX(id) FROM method))');
        // $this->addSql('ALTER TABLE method ALTER id SET DEFAULT nextval(\'method_id_seq\')');
        // $this->addSql('ALTER TABLE method ALTER icon TYPE BYTEA');
    }
}
