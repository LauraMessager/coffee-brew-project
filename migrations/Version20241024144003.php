<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20241024144003 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE messenger_messages (id BIGINT AUTO_INCREMENT NOT NULL, body LONGTEXT NOT NULL, headers LONGTEXT NOT NULL, queue_name VARCHAR(190) NOT NULL, created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', available_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', delivered_at DATETIME DEFAULT NULL COMMENT \'(DC2Type:datetime_immutable)\', INDEX IDX_75EA56E0FB7336F0 (queue_name), INDEX IDX_75EA56E0E3BD61CE (available_at), INDEX IDX_75EA56E016BA31DB (delivered_at), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE brew_guide DROP FOREIGN KEY brew_guide_ibfk_1');
        $this->addSql('DROP INDEX created_by ON brew_guide');
        $this->addSql('ALTER TABLE recipe RENAME INDEX fk_recipe_user TO IDX_DA88B137DE12AB56');
        $this->addSql('ALTER TABLE recipe RENAME INDEX fk_recipe_method TO IDX_DA88B1375E593A60');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE messenger_messages');
        $this->addSql('ALTER TABLE recipe RENAME INDEX idx_da88b137de12ab56 TO fk_recipe_user');
        $this->addSql('ALTER TABLE recipe RENAME INDEX idx_da88b1375e593a60 TO fk_recipe_method');
        $this->addSql('ALTER TABLE brew_guide ADD CONSTRAINT brew_guide_ibfk_1 FOREIGN KEY (created_by) REFERENCES user (id) ON UPDATE NO ACTION ON DELETE CASCADE');
        $this->addSql('CREATE INDEX created_by ON brew_guide (created_by)');
    }
}
